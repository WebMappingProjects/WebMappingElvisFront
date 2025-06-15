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
    enseignement_de_base_font_point: L.icon({
      iconUrl: enseignDeBaseIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    ecoles_mat_primaire_point: L.icon({
      iconUrl: ecolesMatPrimIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    enseignements_secondaires_final_point: L.icon({
      iconUrl: ensSecIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    enseignement_superieur_custom_point: L.icon({
      iconUrl: ensSupIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    eglises_catholiques_font_point: L.icon({
      iconUrl: eglCathIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    eglises_presbyteriennes_font_point: L.icon({
      iconUrl: eglCathIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    eglises_protestantes_point: L.icon({
      iconUrl: eglCathIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    mosquees_font_point: L.icon({
      iconUrl: mosqueeIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    nations_unies_point: L.icon({
      iconUrl: nationsUniesIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    banques_et_microfinances_custom_point: L.icon({
      iconUrl: banquesIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    cites_municipales_cuy_point: L.icon({
      iconUrl: citesMunicipalesIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    centre_special_detat_civil_font_point: L.icon({
      iconUrl: centreSpecialIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    mairies_yaounde_custom_point: L.icon({
      iconUrl: mairieIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    "prefectures_sous-prefectures_custom_point": L.icon({
      iconUrl: prefAndSPrefIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    ambassades_point: L.icon({
      iconUrl: ambassadeIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    gendarmeries_point: L.icon({
      iconUrl: gendarmerieIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    commissariats_yde_font_point: L.icon({
      iconUrl: commissariatIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    boulangeries_custom_point: L.icon({
      iconUrl: boulangerieIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    centres_culturels_custom_point: L.icon({
      iconUrl: centreCulturelIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    hotels_font_point: L.icon({
      iconUrl: hotelsIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    monuments_custom_point: L.icon({
      iconUrl: monumentIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    lieux_remarquables_point: L.icon({
      iconUrl: lieuxRemIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 20],
      popupAnchor: [0, -32],
    }),
    auberges_custom_point: L.icon({
      iconUrl: aubergesIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    bouches_incendies_yde_custom_point: L.icon({
      iconUrl: bouchesIncendiesIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    garages_custom_point: L.icon({
      iconUrl: garageIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    complexes_sportifs_custom_point: L.icon({
      iconUrl: sportIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    sapeurs_pompier_point: L.icon({
      iconUrl: sapeurPompierIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    laveries_font_point: L.icon({
      iconUrl: laverieIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    stations_sevices_font_point: L.icon({
      iconUrl: stationServiceIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
    agences_de_voyages_font_point: L.icon({
      iconUrl: agenceDeVoyageIcon,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -32],
    }),
  };

  const fetchPointsFromDB = async (layerName) => {
    if (!layerName) throw new Error("Layer name is required");
    const layer = selectedLayers.find(l => l.name === layerName);
    if (!layer || !layer.url) throw new Error("Layer URL not found in selectedLayers");

    const token = localStorage.getItem("token");
    //const response = await axios.get(layer.url, { headers: { Authorization: `Bearer ${token}` }});
    const finalUrl = dataOnMapSearch != "" ? `${layer.url}?search=${dataOnMapSearch}` : layer.url;
    const response = await axios.get(`${layer.url}?search=${dataOnMapSearch}`, { headers: { Authorization: `Bearer ${token}` }});
    //console.log("RESPONSE", response);
    if (response.status !== 200) throw new Error("Erreur API");
    return convertGeoJSONTo4326(response.data);
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