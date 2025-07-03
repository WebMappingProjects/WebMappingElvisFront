import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import { useAppMainContext } from "../../context/AppProvider";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const EditionLeafletMap = () => {

  const { currentEditionPoint, setCurrentEditionPoint } = useAppMainContext();

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  // State for marker position
  const [markerPos, setMarkerPos] = useState(
    currentEditionPoint && Array.isArray(currentEditionPoint) && currentEditionPoint.length === 2
      ? { lat: currentEditionPoint[0], lng: currentEditionPoint[1] }
      : { lat: 3.868177, lng: 11.519596 }
  );

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([markerPos.lat, markerPos.lng], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Add marker on map click
      mapInstance.current.on("click", function (e) {
        setMarkerPos({ lat: e.latlng.lat, lng: e.latlng.lng });
        setCurrentEditionPoint([e.latlng.lat, e.latlng.lng]);
      });
    }

    // Show/hide marker based on currentEditionPoint
    if (
      currentEditionPoint &&
      Array.isArray(currentEditionPoint) &&
      currentEditionPoint.length === 2
    ) {
      const latlng = L.latLng(currentEditionPoint[0], currentEditionPoint[1]);
      setMarkerPos({ lat: currentEditionPoint[0], lng: currentEditionPoint[1] });
      if (markerRef.current) {
        markerRef.current.setLatLng(latlng);
        markerRef.current.addTo(mapInstance.current);
      } else if (mapInstance.current) {
        markerRef.current = L.marker(latlng).addTo(mapInstance.current);
      }
      mapInstance.current.setView(latlng, mapInstance.current.getZoom());
    } else {
      // Remove marker if it exists
      if (markerRef.current && mapInstance.current) {
        mapInstance.current.removeLayer(markerRef.current);
        markerRef.current = null;
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      markerRef.current = null;
    };
    // eslint-disable-next-line
  }, [currentEditionPoint]);

  // Update marker position when markerPos changes
  useEffect(() => {
    // Only update marker if currentEditionPoint exists
    if (
      mapInstance.current &&
      currentEditionPoint &&
      Array.isArray(currentEditionPoint) &&
      currentEditionPoint.length === 2
    ) {
      const latlng = L.latLng(markerPos.lat, markerPos.lng);
      if (markerRef.current) {
        markerRef.current.setLatLng(latlng);
      } else {
        markerRef.current = L.marker(latlng).addTo(mapInstance.current);
      }
      mapInstance.current.setView(latlng, mapInstance.current.getZoom());
    }
  }, [markerPos, currentEditionPoint]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMarkerPos((prev) => ({
      ...prev,
      [name]: parseFloat(value)
    }));
    setCurrentEditionPoint([
      name === "lat" ? parseFloat(value) : markerPos.lat,
      name === "lng" ? parseFloat(value) : markerPos.lng
    ]);
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
        </div>
      </div>
    </>
  );
}

EditionLeafletMap.propTypes = {
  layer: PropTypes.string.isRequired,
  attrib: PropTypes.string.isRequired,
};

export default EditionLeafletMap;