// components

import { Outlet } from "react-router-dom";
import LeafletMap from "../../components/Maps/LeafletMap";
import EditionLeafletMap from "../../components/Maps/EditionLeafletMap";

export default function Forms() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 mb-12">
            <EditionLeafletMap />
        </div>
        
        <div className="w-full px-4 mb-12">
          <Outlet />
        </div>
      </div>
    </>
  );
}
