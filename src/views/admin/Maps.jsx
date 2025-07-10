// components

import FooterAdmin from "../../components/Footers/FooterAdmin";
import HeaderStats from "../../components/Headers/HeaderStats";
import LeafletMap from "../../components/Maps/LeafletMap";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import MapNavbar from "../../components/Navbars/MapNavbar";
import MapSidebar from "../../components/Sidebar/MapSidebar";
import { useAppMainContext } from "../../context/AppProvider";

export default function Maps() {
  const { selectedLayers } = useAppMainContext();

  return (
    <>
      <MapSidebar />
      <div className="relative bg-neutral-100 md:ml-80">
        <MapNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="w-full px-0 mx-auto -m-24 md:px-10">
          {/* Map Default Outlef */}
          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
                <LeafletMap selectedLayers={selectedLayers} />
              </div>
            </div>
          </div>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
