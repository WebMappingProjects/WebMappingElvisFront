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
      <div className="relative w-full rounded h-[300px]">
        <div className="h-full rounded" ref={mapRef} />
      </div>
      <form className="flex flex-wrap items-center gap-4 mt-4">
        <label>
          Lat:
          <input
            type="number"
            step="any"
            name="lat"
            value={markerPos.lat}
            onChange={handleInputChange}
            className="px-2 py-1 ml-2 border rounded"
          />
        </label>
        <label>
          Long:
          <input
            type="number"
            step="any"
            name="lng"
            value={markerPos.lng}
            onChange={handleInputChange}
            className="px-2 py-1 ml-2 border rounded"
          />
        </label>
      </form>
    </>
  );
}

EditionLeafletMap.propTypes = {
  layer: PropTypes.string.isRequired,
  attrib: PropTypes.string.isRequired,
};

export default EditionLeafletMap;