// components

import { Outlet } from "react-router-dom";
import EditionLeafletMap from "../../components/Maps/EditionLeafletMap";

export default function ServiceForm() {
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
