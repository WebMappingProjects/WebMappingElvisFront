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

const LeafletMap = ({ layer, attrib }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const popupRef = useRef(null); 
  const workspaceName = "SIG_WORKSPACE"; //"PostGisWorkspace";

  // Fonction pour construire l'URL GetFeatureInfo manuellement
  const getWMSFeatureInfoUrl = (wmsUrl, latlng, map, layerName) => {
    const point = map.latLngToContainerPoint(latlng, map.getZoom());
    const size = map.getSize();
    
    const params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      version: '1.1.1',
      format: 'image/png',
      transparent: true,
      layers: layerName,
      query_layers: layerName,
      info_format: 'application/json',
      width: size.x,
      height: size.y,
      x: Math.round(point.x),
      y: Math.round(point.y)
    };
    
    return wmsUrl + L.Util.getParamString(params, wmsUrl, true);
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
      const wmsUrl = "http://localhost:8080/geoserver/wms";
      const layerName = `${workspaceName}:${layer}`;

      // Ajout d'une couche WMS depuis GeoServer
      const wmsLayer = L.tileLayer.wms(wmsUrl, {
        layers: layerName,
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
        attribution: attrib,
      }).addTo(mapInstance.current);

      // Variable pour suivre l'état du survol
      let isOverFeature = false;

      // Gestion du mouvement de la souris
      mapInstance.current.on('mousemove', async (e) => {
        try {
          const infoUrl = getWMSFeatureInfoUrl(
            wmsUrl,
            e.latlng,
            mapInstance.current,
            layerName
          );

          const response = await fetch(infoUrl);
          const data = await response.json();

          // Vérifier s'il y a des features à cet emplacement
          const hasFeatures = data.features && data.features.length > 0;
          
          // Changer le curseur si l'état a changé
          if (hasFeatures !== isOverFeature) {
            isOverFeature = hasFeatures;
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
      });

      // Gestion du clic sur la carte pour les infos WMS
      mapInstance.current.on('click', async (e) => {
        if (!isOverFeature) return;
        
        try {
          const infoUrl = getWMSFeatureInfoUrl(
            wmsUrl,
            e.latlng,
            mapInstance.current,
            layerName
          );

          const response = await fetch(infoUrl);
          const data = await response.json();

          if (data.features && data.features.length > 0) {
            const feature = data.features[0];
            const properties = feature.properties;
            
            let popupContent = '<div style="max-height: 300px; overflow-y: auto;"><h3>Propriétés</h3><table>';
            
            for (const [key, value] of Object.entries(properties)) {
              popupContent += `<tr><td><strong>${key}</strong></td><td>${value || 'N/A'}</td></tr>`;
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