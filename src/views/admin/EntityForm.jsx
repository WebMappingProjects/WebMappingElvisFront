// components

import { Outlet } from "react-router-dom";
import DrawableLeafletMap from "../../components/Maps/DrawableLeafletMap";

export default function EntityForm() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 mb-12">
            <DrawableLeafletMap />
        </div>
        
        <div className="w-full px-4 mb-12">
          <Outlet />
        </div>
      </div>
    </>
  );
}
