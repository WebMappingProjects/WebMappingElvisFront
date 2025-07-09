import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import axios from "../../api/axios";
import convertGeoJSONTo4326 from "../../utils/convertGeoJSONTo4326";

import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import pharmacieIcon from "../../assets/markers/doctors_bag_32px.png";
import restaurantIcon from "../../assets/markers/restaurant_32px.png";
import enseignDeBaseIcon from "../../assets/markers/students_32px.png";
import ecolesMatPrimIcon from "../../assets/markers/children_32px.png";
import ensSecIcon from "../../assets/markers/student_male_32px.png";
import ensSupIcon from "../../assets/markers/graduation_cap_32px.png";
import eglCathIcon from "../../assets/markers/cross_32px.png";
import mosqueeIcon from "../../assets/markers/mosque_32px.png";
import nationsUniesIcon from "../../assets/markers/united_nations_32px.png";
import banquesIcon from "../../assets/markers/money_bag_32px.png";
import citesMunicipalesIcon from "../../assets/markers/business_building_32px.png";
import centreSpecialIcon from "../../assets/markers/building_32px.png";
import mairieIcon from "../../assets/markers/parliament_32px.png";
import prefAndSPrefIcon from "../../assets/markers/captain_skin_type_3_32px.png";
import ambassadeIcon from "../../assets/markers/embassy_32px.png";
import gendarmerieIcon from "../../assets/markers/soldier_man_32px.png";
import commissariatIcon from "../../assets/markers/air_force_commander_male_32px.png";
import boulangerieIcon from "../../assets/markers/bakery_32px.png";
import centreCulturelIcon from "../../assets/markers/folk_32px.png";
import hotelsIcon from "../../assets/markers/hotel_building_32px.png";
import monumentIcon from "../../assets/markers/statue_32px.png";
import lieuxRemIcon from "../../assets/markers/place_marker_32px.png";
import aubergesIcon from "../../assets/markers/bedroom_32px.png";
import bouchesIncendiesIcon from "../../assets/markers/fire_hydrant_32px.png";
import garageIcon from "../../assets/markers/garage_32px.png";
import sportIcon from "../../assets/markers/gym_32px.png";
import sapeurPompierIcon from "../../assets/markers/firefighter_32px.png";
import laverieIcon from "../../assets/markers/automatic_car_wash_32px.png";
import stationServiceIcon from "../../assets/markers/gas_station_32px.png";
import agenceDeVoyageIcon from "../../assets/markers/trolleybus_32px.png";
import { useAppMainContext } from "../../context/AppProvider";


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
  const { dataOnMapSearch } = useAppMainContext();
  const [routeLayer, setRouteLayer] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [selectingService, setSelectingService] = useState(false);
  const [distanceToService, setDistanceToService] = useState(null);

  // Correspondance couche -> icône personnalisée (chaque icône dans un cercle blanc)
  const makeCircleIcon = (iconUrl) => L.divIcon({
    html: `<div style="background:#fff;border-radius:50%;box-shadow:0 2px 8px #0002;border:2px solid #fff;width:36px;height:36px;display:flex;align-items:center;justify-content:center;"><img src='${iconUrl}' style='width:22px;height:22px;display:block;'/></div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });

  const layerIcons = {
    restaurants_yaounde_font_point: makeCircleIcon(restaurantIcon),
    centre_sante: makeCircleIcon(pharmacieIcon),
    enseignement_de_base_font_point: makeCircleIcon(enseignDeBaseIcon),
    ecoles_mat_primaire_point: makeCircleIcon(ecolesMatPrimIcon),
    enseignement: makeCircleIcon(ensSecIcon),
    enseignement_superieur_custom_point: makeCircleIcon(ensSupIcon),
    eglises: makeCircleIcon(eglCathIcon),
    eglises_presbyteriennes_font_point: makeCircleIcon(eglCathIcon),
    eglises_protestantes_point: makeCircleIcon(eglCathIcon),
    mosquees_font_point: makeCircleIcon(mosqueeIcon),
    nations_unies_point: makeCircleIcon(nationsUniesIcon),
    banques_et_microfinances_custom_point: makeCircleIcon(banquesIcon),
    cites_municipales_cuy_point: makeCircleIcon(citesMunicipalesIcon),
    centre_special_detat_civil_font_point: makeCircleIcon(centreSpecialIcon),
    mairies_yaounde_custom_point: makeCircleIcon(mairieIcon),
    "prefectures_sous-prefectures_custom_point": makeCircleIcon(prefAndSPrefIcon),
    ambassades_point: makeCircleIcon(ambassadeIcon),
    gendarmeries_point: makeCircleIcon(gendarmerieIcon),
    securite: makeCircleIcon(commissariatIcon),
    boulangeries_custom_point: makeCircleIcon(boulangerieIcon),
    centres_culturels_custom_point: makeCircleIcon(centreCulturelIcon),
    hebergements: makeCircleIcon(hotelsIcon),
    monuments_custom_point: makeCircleIcon(monumentIcon),
    lieux_remarquables_point: makeCircleIcon(lieuxRemIcon),
    auberges_custom_point: makeCircleIcon(aubergesIcon),
    bouches_incendies_yde_custom_point: makeCircleIcon(bouchesIncendiesIcon),
    garages_custom_point: makeCircleIcon(garageIcon),
    complexes_sportifs_custom_point: makeCircleIcon(sportIcon),
    sapeurs_pompier_point: makeCircleIcon(sapeurPompierIcon),
    laveries_font_point: makeCircleIcon(laverieIcon),
    services_publiques: makeCircleIcon(stationServiceIcon),
    agences_de_voyages_font_point: makeCircleIcon(agenceDeVoyageIcon),
  };

  const fetchPointsFromDB = async (layerName) => {
    if (!layerName) throw new Error("Layer name is required");
    const layer = selectedLayers.find(l => l.name === layerName);
    if (!layer || !layer.url) throw new Error("Layer URL not found in selectedLayers");

    const token = localStorage.getItem("token");
    const finalUrl = dataOnMapSearch != "" ? `${layer.url}?search=${dataOnMapSearch}` : layer.url;
    const response = await axios.get(`${layer.url}?search=${dataOnMapSearch}`, { headers: { Authorization: `Bearer ${token}` }});
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

    // Ajout des nouvelles couches vectorielles avec clustering
    selectedLayers.forEach(async (layer) => {
      if (!map._customGeoJsonLayers[layer.name]) {
        try {
          const geojson = await fetchPointsFromDB(layer.name);
          // Récupérer l'URL de l'icône d'origine pour le cluster
          const iconUrlMap = {
            restaurants_yaounde_font_point: restaurantIcon,
            centre_sante: pharmacieIcon,
            enseignement_de_base_font_point: enseignDeBaseIcon,
            ecoles_mat_primaire_point: ecolesMatPrimIcon,
            enseignement: ensSecIcon,
            enseignement_superieur_custom_point: ensSupIcon,
            eglises: eglCathIcon,
            eglises_presbyteriennes_font_point: eglCathIcon,
            eglises_protestantes_point: eglCathIcon,
            mosquees_font_point: mosqueeIcon,
            nations_unies_point: nationsUniesIcon,
            banques_et_microfinances_custom_point: banquesIcon,
            cites_municipales_cuy_point: citesMunicipalesIcon,
            centre_special_detat_civil_font_point: centreSpecialIcon,
            mairies_yaounde_custom_point: mairieIcon,
            "prefectures_sous-prefectures_custom_point": prefAndSPrefIcon,
            ambassades_point: ambassadeIcon,
            gendarmeries_point: gendarmerieIcon,
            securite: commissariatIcon,
            boulangeries_custom_point: boulangerieIcon,
            centres_culturels_custom_point: centreCulturelIcon,
            hebergements: hotelsIcon,
            monuments_custom_point: monumentIcon,
            lieux_remarquables_point: lieuxRemIcon,
            auberges_custom_point: aubergesIcon,
            bouches_incendies_yde_custom_point: bouchesIncendiesIcon,
            garages_custom_point: garageIcon,
            complexes_sportifs_custom_point: sportIcon,
            sapeurs_pompier_point: sapeurPompierIcon,
            laveries_font_point: laverieIcon,
            services_publiques: stationServiceIcon,
            agences_de_voyages_font_point: agenceDeVoyageIcon,
          };
          const iconUrl = iconUrlMap[layer.name] || L.Icon.Default.prototype.options.iconUrl;
          const icon = layerIcons[layer.name] || L.Icon.Default.prototype;

          // Création du cluster group
          const markers = L.markerClusterGroup({
            iconCreateFunction: function(cluster) {
              const count = cluster.getChildCount();
              return L.divIcon({
                html: `<div style='position:relative;'><span style='position:absolute;top:-18px;left:50%;transform:translateX(-50%);background:#fffa;padding:1px 5px;border-radius:8px;font-size:13px;font-weight:bold;color:#333;border:1px solid #bbb;'>${count}</span><div style="background:#fff;border-radius:50%;box-shadow:0 2px 8px #0002;border:2px solid #fff;width:36px;height:36px;display:flex;align-items:center;justify-content:center;"><img src='${iconUrl}' style='width:22px;height:22px;display:block;'/></div></div>`,
                className: 'custom-cluster-icon',
                iconSize: [36, 54],
                iconAnchor: [18, 27],
                popupAnchor: [0, -27],
              });
            }
          });

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
          markers.addLayer(geoJsonLayer);
          markers.addTo(map);
          map._customGeoJsonLayers[layer.name] = markers;
        } catch (err) {
          console.error('Erreur chargement des donnees depuis l\'API', layer.name, err);
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
  }, [selectedLayers, layerIcons, dataOnMapSearch]);
  // Pour le warning React Hook, layerIcons est une constante statique, on peut l'ignorer avec un commentaire ESLint
  // eslint

  // Fonction pour obtenir la position de l'utilisateur
  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPosition([latitude, longitude]);
        mapInstance.current.setView([latitude, longitude], 15);
        L.marker([latitude, longitude], { icon: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png', iconSize: [32, 32], iconAnchor: [16, 32] }) }).addTo(mapInstance.current);
      },
      () => alert("Impossible de récupérer la position."),
      { enableHighAccuracy: true }
    );
  };

  // Fonction pour calculer la distance (Haversine)
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const tetta1 = lat1 * Math.PI/180, tetta2 = lat2 * Math.PI/180;
    const deltaTetta = (lat2-lat1) * Math.PI/180;
    const deltaLambda = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(deltaTetta/2) * Math.sin(deltaTetta/2) + Math.cos(tetta1) * Math.cos(tetta2) * Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Fonction pour trouver le service le plus proche
  const findClosestService = () => {
    if (!userPosition) return null;
    let minDist = Infinity, closest = null;
    Object.values(mapInstance.current._customGeoJsonLayers || {}).forEach(cluster => {
      cluster.getLayers().forEach(marker => {
        const { lat, lng } = marker.getLatLng();
        const dist = getDistance(userPosition[0], userPosition[1], lat, lng);
        if (dist < minDist) {
          minDist = dist;
          closest = marker;
        }
      });
    });
    return closest;
  };

  // Fonction pour tracer l'itinéraire voiture (OSRM)
  const drawRoute = async (from, to) => {
    if (routeLayer) {
      mapInstance.current.removeLayer(routeLayer);
      setRouteLayer(null);
    }
    // Utilisation de OSRM public API
    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.routes || !data.routes[0]) throw new Error('Aucun itinéraire trouvé');
      const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      const polyline = L.polyline(coords, { color: "blue", weight: 5 }).addTo(mapInstance.current);
      setRouteLayer(polyline);
      mapInstance.current.fitBounds(polyline.getBounds());
    } catch (e) {
      alert("Erreur lors du calcul de l'itinéraire");
    }
  };

  // Bouton 1 : Localiser et tracer vers le plus proche
  const handleLocateAndRoute = async () => {
    locateUser();
    setTimeout(async () => {
      const closest = findClosestService();
      if (closest && userPosition) {
        await drawRoute(userPosition, [closest.getLatLng().lat, closest.getLatLng().lng]);
        setDistanceToService(getDistance(userPosition[0], userPosition[1], closest.getLatLng().lat, closest.getLatLng().lng));
      }
    }, 1500);
  };

  // Bouton 2 : Annuler et choisir un autre service
  const handleCancelAndSelect = () => {
    if (routeLayer) {
      mapInstance.current.removeLayer(routeLayer);
      setRouteLayer(null);
    }
    setSelectingService(true);
    setDistanceToService(null);
    alert("Cliquez sur un service de la carte pour calculer l'itinéraire.");
  };

  // Gestion du clic sur un marker pour sélection manuelle
  useEffect(() => {
    if (!selectingService) return;
    const map = mapInstance.current;
    const onMarkerClick = async (e) => {
      if (userPosition) {
        await drawRoute(userPosition, [e.latlng.lat, e.latlng.lng]);
        setDistanceToService(getDistance(userPosition[0], userPosition[1], e.latlng.lat, e.latlng.lng));
        setSelectingService(false);
      } else {
        alert("Veuillez d'abord localiser votre position.");
      }
    };
    Object.values(map._customGeoJsonLayers || {}).forEach(cluster => {
      cluster.getLayers().forEach(marker => marker.on('click', onMarkerClick));
    });
    return () => {
      Object.values(map._customGeoJsonLayers || {}).forEach(cluster => {
        cluster.getLayers().forEach(marker => marker.off('click', onMarkerClick));
      });
    };
  }, [selectingService, userPosition]);

  return (
    <div className="relative w-full rounded h-[600px]">
      <div className="absolute top-20 left-2 z-[1000] flex flex-col gap-2">
        <button onClick={handleLocateAndRoute} className="px-3 py-1 text-white bg-blue-600 rounded shadow">Itinéraire vers le plus proche</button>
        {/* <button onClick={handleCancelAndSelect} className="px-3 py-1 text-white bg-red-600 rounded shadow">Choisir un autre service</button> */}
        {distanceToService && <div className="p-2 text-black bg-white rounded shadow">Distance : {(distanceToService/1000).toFixed(2)} km</div>}
      </div>
      <div className="h-full rounded" ref={mapRef} />
    </div>
  );
};

export default LeafletMap;