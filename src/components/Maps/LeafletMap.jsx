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

const LeafletMap = ({ selectedLayers = [] }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const popupRef = useRef(null);
  const workspaceName = "SIG_WORKSPACE";
  const mainGeoserverRoute = "/geoserver";

  // Correspondance couche -> icône personnalisée (URL PNG/SVG ou L.divIcon)
  const layerIcons = {
    restaurants_yaounde_font_point: L.icon({
      iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon-restaurant.png', // Remplace par une URL d'icône de couverts
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    pharmacies_point: L.icon({
      iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon-pharmacy.png', // Remplace par une URL d'icône pharmacie
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    // Ajoute d'autres couches/icônes ici
  };

  // Fonction pour charger les entités WFS (GeoJSON) d'une couche
  const fetchWFSGeoJSON = async (layerName) => {
    // const wfsUrl = `${mainGeoserverRoute}/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=${workspaceName}:${layerName}&outputFormat=application/json`;
    const wfsUrl = `${mainGeoserverRoute}/wfs?service=WFS&version=1.1.0&request=GetFeatureInfo&layers=${workspaceName}:${layerName}&query_layers=${workspaceName}:${layerName}&info_format=application/json`;
    const response = await fetch(wfsUrl);
    console.log("RESPONSE WFS", response);
    if (!response.ok) throw new Error('Erreur WFS');
    return response.json();
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialisation de la carte si besoin
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([3.868177, 11.519596], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);
    }
    const map = mapInstance.current;

    // Nettoyage des anciennes couches vectorielles
    if (!map._customGeoJsonLayers) map._customGeoJsonLayers = {};
    Object.keys(map._customGeoJsonLayers).forEach(layerName => {
      if (!selectedLayers.find(l => l.name === layerName)) {
        map.removeLayer(map._customGeoJsonLayers[layerName]);
        delete map._customGeoJsonLayers[layerName];
      }
    });

    // Ajout des nouvelles couches vectorielles
    selectedLayers.forEach(async (layer) => {
      if (!map._customGeoJsonLayers[layer.name]) {
        try {
          const geojson = await fetchWFSGeoJSON(layer.name);
          const icon = layerIcons[layer.name] || L.Icon.Default.prototype;
          const geoJsonLayer = L.geoJSON(geojson, {
            pointToLayer: (feature, latlng) => L.marker(latlng, { icon }),
            onEachFeature: (feature, lyr) => {
              lyr.on('click', (e) => {
                const properties = feature.properties;
                let popupContent = '<div style="max-height: 300px; overflow-y: auto;"><h3 class="font-bold text-lg mb-3 text-center text-primary-dark">Propriétés</h3><table>';
                for (const [key, value] of Object.entries(properties)) {
                  popupContent += `<tr class="border"><td class="px-3 py-2 border"><strong>${key}</strong></td><td class="px-2 py-2">${value || 'N/A'}</td></tr>`;
                }
                popupContent += '</table></div>';
                if (popupRef.current) map.closePopup(popupRef.current);
                popupRef.current = L.popup().setLatLng(e.latlng).setContent(popupContent).openOn(map);
              });
            }
          });
          geoJsonLayer.addTo(map);
          map._customGeoJsonLayers[layer.name] = geoJsonLayer;
        } catch (err) {
          console.error('Erreur chargement WFS', layer.name, err);
        }
      }
    });

    // Nettoyage à la désactivation
    return () => {
      if (map._customGeoJsonLayers) {
        Object.values(map._customGeoJsonLayers).forEach(l => map.removeLayer(l));
        map._customGeoJsonLayers = {};
      }
    };
  }, [selectedLayers, layerIcons]);
  // Pour le warning React Hook, layerIcons est une constante statique, on peut l'ignorer avec un commentaire ESLint
  // eslint

  return (
    <div className="relative w-full rounded h-[600px]">
      <div className="h-full rounded" ref={mapRef} />
    </div>
  );
};

export default LeafletMap;