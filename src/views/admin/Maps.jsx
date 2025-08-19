import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeafletMap from "../../components/Maps/LeafletMap";
import MapSidebar from "../../components/Sidebar/MapSidebar";
import MapNavbar from "../../components/Navbars/MapNavbar";
import FooterAdmin from "../../components/Footers/FooterAdmin";
import { useAppMainContext } from "../../context/AppProvider";
import { FaLayerGroup, FaChevronRight } from "react-icons/fa";

export default function Maps() {
  const { selectedLayers } = useAppMainContext();
  const [ isSidebarVisible, setIsSidebarVisible ] = useState(true);

  return (
    <div className="relative h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
      {/* Sidebar avec animation */}
      <AnimatePresence>
        { isSidebarVisible == true ? (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute z-[1100] h-full bg-amber-300"
          >
            <MapSidebar 
              isSidebarVisible={isSidebarVisible}
              setIsSidebarVisible={setIsSidebarVisible}
            />
          </motion.div>
        ) : null }
      </AnimatePresence>

      {/* Contenu principal */}
      <div className={`h-full transition-all duration-300 md:ml-80`}>
        {/* Bouton de contrôle de la sidebar */}
        {/* <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute md:hidden z-[1500] top-1/2 ${sidebarOpen ? 'left-72' : 'left-0'} transform -translate-y-1/2 bg-white p-2 rounded-r-lg shadow-md hover:bg-gray-100 transition-all`}
        >
          <motion.div
            animate={{ rotate: sidebarOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <FaChevronRight className="text-gray-600" />
          </motion.div>
        </button> */}

        {/* Navbar */}
        <MapNavbar 
          isSidebarVisible={isSidebarVisible}
          setIsSidebarVisible={setIsSidebarVisible}
        />

        {/* Carte en plein écran */}
        <div className="h-[calc(100%-110px)]">
          <LeafletMap selectedLayers={selectedLayers} />
        </div>

        {/* Footer minimaliste */}
        {/* <FooterAdmin /> */}
      </div>
    </div>
  );
}