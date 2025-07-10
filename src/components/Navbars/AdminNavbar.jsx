import { FaSearch, FaMapMarkedAlt } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";

export default function AdminNavbar() {
  const { dataSearch, setDataSearch } = useAppMainContext();

  return (
    <nav className="absolute top-0 left-0 z-10 w-full p-4 bg-transparent">
      <div className="container flex items-center justify-between mx-auto">
        {/* Brand Logo avec icône */}
        <div className="flex items-center space-x-2">
          <FaMapMarkedAlt className="text-2xl text-white" />
          <a
            href="/"
            className="text-lg font-bold text-white transition-colors hover:text-blue-200"
          >
            <span className="hidden sm:inline">Tables</span> de Données
          </a>
        </div>

        {/* Barre de recherche améliorée */}
        <div className="relative w-full max-w-md mx-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un lieu, une adresse..."
            className="w-full py-2 pl-10 pr-4 text-sm text-gray-800 transition-all duration-200 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={dataSearch}
            onChange={(e) => setDataSearch(e.target.value)}
          />
          {dataSearch && (
            <button
              type="button"
              onClick={() => setDataSearch("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
