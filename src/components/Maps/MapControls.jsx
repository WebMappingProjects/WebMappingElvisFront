import { motion } from "framer-motion";

const MapControls = ({ onLocate, onReset, distance }) => {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-3">
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLocate}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 backdrop-blur-sm bg-opacity-90"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Itinéraire vers le plus proche
      </motion.button>

      {distance && (
        <div className="p-3 text-sm bg-white rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90">
          <span className="font-semibold text-gray-700">Distance : </span>
          <span className="font-bold text-blue-600">{(distance/1000).toFixed(2)} km</span>
        </div>
      )}
    </div>
  );
};

export default MapControls;