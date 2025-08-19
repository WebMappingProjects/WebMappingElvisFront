import { FaBars, FaLayerGroup, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";

export default function MapNavbar({ isSidebarVisible, setIsSidebarVisible }) {
  const { dataOnMapSearch, setDataOnMapSearch, selectedLayers } = useAppMainContext();

  return (
    <nav className="relative z-10 w-full p-4 bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
      <div className="container flex items-stretch justify-between mx-auto flex-col md:flex-row">

        {/* Logo, titre et menu Mobile */}
        <div className="flex items-center space-x-3 mb-3">
          <button 
            className={`flex items-center space-x-3 md:hidden`}
            onClick={() => setIsSidebarVisible(true)}
            >
            <FaBars className="text-2xl text-white" />
          </button>
          <div className="flex items-center justify-center space-x-3 mr-1 flex-1">
            <FaMapMarkedAlt className="text-2xl text-white" />
            <h1 className="text-xl font-bold text-white">MaKarte</h1>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="relative flex-1 max-w-2xl mx-4 block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un lieu, une adresse..."
            className="w-full py-2 pl-10 pr-4 text-sm text-gray-800 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={dataOnMapSearch}
            onChange={(e) => setDataOnMapSearch(e.target.value)}
          />
          {dataOnMapSearch && (
            <button
              onClick={() => setDataOnMapSearch("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Couches actives */}
        <div className="hidden md:flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg">
          <FaLayerGroup className="text-primary-default" />
          <span className="text-sm font-medium text-primary-default">
            {selectedLayers.length} couches actives
          </span>
        </div>
      </div>
    </nav>
  );
}