import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletMap = ({ layer = "pharmacies_point", attrib }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const popupRef = useRef(null); 
  const workspaceName = "SIG_WORKSPACE"; //"SIG_WORKSPACE"; //"PostGisWorkspace";
  const mainGeoserverRoute = "/geoserver"; // "http://localhost:8080/geoserver";

  const getWMSFeatureInfoUrl = (wmsUrl, latlng, map, layerName, options = {}) => {
    // Vérification des paramètres obligatoires
    if (!wmsUrl || !latlng || !map || !layerName) {
      console.error('Paramètres manquants pour getWMSFeatureInfoUrl');
      return null;
    }
  
    // Conversion du point de géolocalisation en coordonnées de pixel sur la carte
    const point = map.latLngToContainerPoint(latlng, map.getZoom());
    const size = map.getSize();
    
    // Calcul de la bbox (bounding box) - ESSENTIEL pour GetFeatureInfo
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    // Format de la bbox dépend de la version WMS
    const bbox = options.version === '1.3.0' && options.crs === 'EPSG:4326' 
      ? `${sw.lat},${sw.lng},${ne.lat},${ne.lng}` // lat,lng pour WMS 1.3.0 avec EPSG:4326
      : `${sw.lng},${sw.lat},${ne.lng},${ne.lat}`; // lng,lat pour WMS 1.1.1
    
    // Paramètres par défaut qui peuvent être personnalisés via le paramètre options
    const params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      // Pour GeoServer 2.28, on utilise CRS au lieu de SRS pour la version 1.3.0
      [options.version === '1.3.0' ? 'crs' : 'srs']: 'EPSG:4326',
      version: options.version || '1.1.1', // Version 1.1.1 par défaut (plus stable avec GeoServer)
      format: 'image/png',
      transparent: true,
      layers: layerName,
      query_layers: layerName,
      info_format: 'application/json', // S'assurer que ce format est bien supporté
      width: size.x,
      height: size.y,
      // Pour 1.3.0, on utilise i/j au lieu de x/y
      ...(options.version === '1.3.0' ? {
        i: Math.round(point.x),
        j: Math.round(point.y)
      } : {
        x: Math.round(point.x),
        y: Math.round(point.y)
      }),
      bbox: bbox, // IMPORTANT: Ajout de la bbox obligatoire pour GetFeatureInfo
      feature_count: 10,
      buffer: 5,
      ...options
    };
    
    // Construire et retourner l'URL
    try {
      return wmsUrl + L.Util.getParamString(params, wmsUrl, true);
    } catch (error) {
      console.error('Erreur lors de la génération de l\'URL:', error);
      return null;
    }
  };
  
  // Fonction pour gérer la requête GetFeatureInfo avec gestion des formats
  const fetchWMSFeatureInfo = async (wmsUrl, latlng, map, layerName, options = {}) => {
    try {
      // Générer l'URL pour la requête GetFeatureInfo
      const url = getWMSFeatureInfoUrl(wmsUrl, latlng, map, layerName, options);
      
      if (!url) return null;
      
      //console.log('URL GetFeatureInfo générée:', url);
      
      // Faire la requête HTTP
      const response = await fetch(url);
      
      // Vérifier le statut HTTP
      if (!response.ok) {
        console.error(`Erreur HTTP: ${response.status} ${response.statusText}`);
        return { 
          error: `Erreur HTTP: ${response.status} ${response.statusText}`,
          url: url
        };
      }
      
      // Vérifier le content-type de la réponse
      const contentType = response.headers.get('content-type');
      //console.log('Content-Type reçu:', contentType);
      
      // Traiter la réponse selon son format
      if (contentType && contentType.includes('application/json')) {
        const jsonData = await response.json();
        //console.log('Données JSON reçues:', jsonData);
        return jsonData;
      } else if (contentType && (contentType.includes('application/xml') || contentType.includes('text/xml'))) {
        // Si XML reçu au lieu de JSON, le convertir en texte
        const xmlText = await response.text();
        console.warn('Reçu XML au lieu de JSON:', xmlText.substring(0, 200) + '...');
        
        return { 
          error: "Format XML reçu au lieu de JSON", 
          rawData: xmlText,
          url: url 
        };
      } else {
        // Pour tout autre type de contenu (y compris text/plain)
        const text = await response.text();
        console.log(`Contenu reçu (${contentType}):`, text.substring(0, 200) + (text.length > 200 ? '...' : ''));
        
        // Si c'est du text/plain qui contient des données formatées, on essaie de les traiter
        if (contentType && contentType.includes('text/plain') && text.includes('Feature')) {
          // On a probablement des données de feature en format texte
          console.log('Données de feature détectées en format texte');
          
          // Tentative basique de conversion en objet structuré
          try {
            const features = text.split('\n\n')
              .filter(block => block.trim().length > 0)
              .map(block => {
                const lines = block.split('\n');
                const featureId = lines[0].includes('Feature') ? lines[0].trim() : null;
                const properties = {};
                
                lines.slice(1).forEach(line => {
                  const parts = line.split('=');
                  if (parts.length === 2) {
                    const key = parts[0].trim();
                    const value = parts[1].trim();
                    properties[key] = value;
                  }
                });
                
                return { id: featureId, properties };
              });
            
            return { features };
          } catch (parseError) {
            console.warn('Erreur lors du parsing du texte:', parseError);
          }
        }
        
        return { 
          format: contentType,
          rawData: text,
          url: url
        };
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations:', error);
      return { error: error.message };
    }
  };
  
  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([3.868177, 11.519596], 12);

      // Couche de base OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Configuration de la couche WMS
      const wmsUrl = `${mainGeoserverRoute}/wms`;
      const layerName = `${workspaceName}:${layer}`;

      // Ajout d'une couche WMS depuis GeoServer
      L.tileLayer.wms(wmsUrl, {
        layers: layerName,
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
        attribution: attrib,
        //styles: "poi"
      }).addTo(mapInstance.current);
      
      // Variable pour suivre l'état du survol
      let isOverFeature = false;
      let currentFeature = null;

      // Gestion du mouvement de la souris
      mapInstance.current.on('mousemove', async (e) => {
        try {
          const infoUrl = await fetchWMSFeatureInfo(
            wmsUrl,
            e.latlng,
            mapInstance.current,
            layerName
          );

          const data = infoUrl;

          // Vérifier s'il y a des features à cet emplacement
          const hasFeatures = data.features && data.features.length > 0;
          
          // Changer le curseur si l'état a changé
          if (hasFeatures !== isOverFeature) {
            isOverFeature = hasFeatures;
            currentFeature = data;
            const container = mapInstance.current.getContainer();
            container.style.cursor = hasFeatures ? 'pointer' : '';
          }
        } catch (error) {
          console.error("Erreur lors de la vérification des features:", error);
        }
      });

      // Réinitialiser le curseur quand la souris quitte la carte
      mapInstance.current.on('mouseout', () => {
        const container = mapInstance.current.getContainer();
        container.style.cursor = '';
        isOverFeature = false;
        currentFeature = null;
      });

      // Gestion du clic sur la carte pour les infos WMS
      mapInstance.current.on('click', async (e) => {
        if (!isOverFeature) return;
        
        try {
          /*const infoUrl = await fetchWMSFeatureInfo(
            wmsUrl,
            e.latlng,
            mapInstance.current,
            layerName
          );

          const data = infoUrl*/
          const data = currentFeature;

          if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            const properties = feature.properties;
            
            let popupContent = '<div style="max-height: 300px; overflow-y: auto;"><h3 class="font-bold text-lg mb-3 text-center text-primary-dark">Propriétés</h3><table>';
            
            for (const [key, value] of Object.entries(properties)) {
              popupContent += `<tr class="border"><td class="px-3 py-2 border"><strong>${key}</strong></td><td class="px-2 py-2">${value || 'N/A'}</td></tr>`;
            }
            
            popupContent += '</table></div>';

            if (popupRef.current) {
              mapInstance.current.closePopup(popupRef.current);
            }

            popupRef.current = L.popup()
              .setLatLng(e.latlng)
              .setContent(popupContent)
              .openOn(mapInstance.current);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des informations:", error);
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [layer, attrib]);

  return (
    <div className="relative w-full rounded h-[600px]">
      <div className="h-full rounded" ref={mapRef} />
    </div>
  );
}

LeafletMap.propTypes = {
  layer: PropTypes.string.isRequired,
  attrib: PropTypes.string.isRequired,
};

export default LeafletMap;