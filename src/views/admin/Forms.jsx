// components

import { Outlet } from "react-router-dom";
import LeafletMap from "../../components/Maps/LeafletMap";

export default function Forms() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 mb-12">
            <LeafletMap />
        </div>
        
        <div className="w-full px-4 mb-12">
          <Outlet />
        </div>
      </div>
    </>
  );
}
