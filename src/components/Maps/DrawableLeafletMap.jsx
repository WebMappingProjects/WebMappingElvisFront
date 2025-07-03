import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw"; // Assurez-vous que leaflet-draw est installé
import PropTypes from "prop-types";
import { useAppMainContext } from "../../context/AppProvider";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DrawableLeafletMap = () => {

  const { currentEditionPoint, setCurrentEditionPoint } = useAppMainContext();

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const drawControlRef = useRef(null);
  const selectedMarkerRef = useRef(null);
  const vertexMarkersRef = useRef([]);

  // State for marker position
  const [markerPos, setMarkerPos] = useState(
    currentEditionPoint && Array.isArray(currentEditionPoint) && currentEditionPoint.length === 2
      ? { lat: currentEditionPoint[0], lng: currentEditionPoint[1] }
      : { lat: 3.868177, lng: 11.519596 }
  );

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialiser la carte seulement une fois
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([markerPos.lat, markerPos.lng], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      drawControlRef.current = new L.Control.Draw({
        draw: false,
        edit: false,
      });
      mapInstance.current.addControl(drawControlRef.current);

      mapInstance.current.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer;
        layer.addTo(mapInstance.current);

        // Si c'est une ligne ou un polygone, on ajoute un gestionnaire de clic sur chaque point
        if (layer instanceof L.Polyline || layer instanceof L.Polygon) {
          const latlngs = layer.getLatLngs();
          const points = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
          points.forEach((latlng, index) => {
            const marker = L.circleMarker(latlng, { 
              radius: 6, 
              color: '#3B82F6', 
              fillColor: '#3B82F6',
              fillOpacity: 0.8,
              weight: 2
            }).addTo(mapInstance.current);
            
            // Stocker la référence au marker avec ses coordonnées originales
            marker.originalLatLng = latlng;
            marker.parentLayer = layer;
            vertexMarkersRef.current.push(marker);
            
            marker.on('click', () => {
              // Réinitialiser le style de l'ancien marqueur sélectionné
              if (selectedMarkerRef.current) {
                selectedMarkerRef.current.setStyle({
                  radius: 6,
                  color: '#3B82F6',
                  fillColor: '#3B82F6',
                  fillOpacity: 0.8,
                  weight: 2
                });
              }
              
              // Mettre à jour le style du nouveau marqueur sélectionné
              marker.setStyle({
                radius: 8,
                color: '#EF4444',
                fillColor: '#FCA5A5',
                fillOpacity: 1,
                weight: 3
              });
              
              selectedMarkerRef.current = marker;
              setMarkerPos({ lat: latlng.lat, lng: latlng.lng });
              setCurrentEditionPoint([latlng.lat, latlng.lng]);
            });
          });
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line
  }, []);

  // Effet séparé pour mettre à jour la position du marqueur sans recréer la carte
  useEffect(() => {
    if (currentEditionPoint && Array.isArray(currentEditionPoint) && currentEditionPoint.length === 2) {
      setMarkerPos({ lat: currentEditionPoint[0], lng: currentEditionPoint[1] });
    }
  }, [currentEditionPoint]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newMarkerPos = {
      ...markerPos,
      [name]: parseFloat(value)
    };
    setMarkerPos(newMarkerPos);
    setCurrentEditionPoint([
      name === "lat" ? parseFloat(value) : markerPos.lat,
      name === "lng" ? parseFloat(value) : markerPos.lng
    ]);
  };

  // Fonction pour repositionner le point sélectionné
  const handleRepositionPoint = () => {
    if (selectedMarkerRef.current && mapInstance.current) {
      const newLatLng = L.latLng(markerPos.lat, markerPos.lng);
      
      // Mettre à jour la position du marker sélectionné
      selectedMarkerRef.current.setLatLng(newLatLng);
      
      // Mettre à jour les coordonnées dans la géométrie parent
      const parentLayer = selectedMarkerRef.current.parentLayer;
      if (parentLayer) {
        const latlngs = parentLayer.getLatLngs();
        const points = Array.isArray(latlngs[0]) ? latlngs[0] : latlngs;
        
        // Trouver l'index du point à mettre à jour
        const originalLatLng = selectedMarkerRef.current.originalLatLng;
        const pointIndex = points.findIndex(point => 
          Math.abs(point.lat - originalLatLng.lat) < 0.000001 && 
          Math.abs(point.lng - originalLatLng.lng) < 0.000001
        );
        
        if (pointIndex !== -1) {
          points[pointIndex] = newLatLng;
          parentLayer.setLatLngs(Array.isArray(latlngs[0]) ? [points] : points);
          selectedMarkerRef.current.originalLatLng = newLatLng;
        }
      }
      
      // Centrer la carte sur le nouveau point
      mapInstance.current.setView([markerPos.lat, markerPos.lng], mapInstance.current.getZoom());
    }
  };

  // Fonctions pour activer le dessin
  const handleDrawLine = () => {
    if (mapInstance.current) {
      new L.Draw.Polyline(mapInstance.current).enable();
    }
  };
  const handleDrawPolygon = () => {
    if (mapInstance.current) {
      new L.Draw.Polygon(mapInstance.current).enable();
    }
  };

  // Fonction pour vider la carte (supprimer toutes les couches sauf la tuile de base)
  const handleClearMap = () => {
    if (mapInstance.current) {
      // On garde la couche de tuiles de base (première couche ajoutée)
      const baseLayerId = Object.keys(mapInstance.current._layers)[0];
      mapInstance.current.eachLayer((layer) => {
        if (layer._leaflet_id !== parseInt(baseLayerId)) {
          if (layer.remove && typeof layer.remove === "function") layer.remove();
        }
      });
      // Réinitialiser les refs des markers
      vertexMarkersRef.current = [];
      selectedMarkerRef.current = null;
    }
  };

  return (
    <>
      <div className="relative w-full rounded-lg shadow-lg overflow-hidden h-[300px]">
        <div className="h-full rounded-lg" ref={mapRef} />
      </div>
      
      {/* Formulaire avec design amélioré */}
      <div className="p-4 mt-4 border border-blue-200 rounded-lg shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="flex items-center mb-3 text-lg font-semibold text-gray-800">
          <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></span>
          Coordonnées du point
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              name="lat"
              value={markerPos.lat}
              onChange={handleInputChange}
              className="w-32 px-3 py-2 transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Latitude"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              name="lng"
              value={markerPos.lng}
              onChange={handleInputChange}
              className="w-32 px-3 py-2 transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Longitude"
            />
          </div>
          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={handleRepositionPoint}
              disabled={!selectedMarkerRef.current}
              className={`cursor-pointer px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedMarkerRef.current
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="w-2 h-2 bg-current rounded-full"></span>
              Repositionner
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          className="group text-sm cursor-pointer md:w-[200px] w-full relative px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
          onClick={handleDrawLine}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Dessiner une ligne
          </div>
          <div className="absolute inset-0 transition-opacity duration-200 rounded-lg opacity-0 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:opacity-100"></div>
        </button>
        
        <button
          type="button"
          className="group text-sm relative md:w-[200px] w-full cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
          onClick={handleDrawPolygon}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10l2 5-2 5H7l-2-5 2-5z" />
            </svg>
            Dessiner un polygone
          </div>
          <div className="absolute inset-0 transition-opacity duration-200 rounded-lg opacity-0 bg-gradient-to-r from-green-600 to-green-700 group-hover:opacity-100"></div>
        </button>

        <button
          type="button"
          className="group text-sm md:w-[200px] w-full relative cursor-pointer px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
          onClick={handleClearMap}
        >
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Vider la carte
          </div>
          <div className="absolute inset-0 transition-opacity duration-200 rounded-lg opacity-0 bg-gradient-to-r from-red-600 to-red-700 group-hover:opacity-100"></div>
        </button>
      </div>
    </>
  );
}

DrawableLeafletMap.propTypes = {
  layer: PropTypes.string.isRequired,
  attrib: PropTypes.string.isRequired,
};

export default DrawableLeafletMap;