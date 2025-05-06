// components

import { Outlet } from "react-router-dom";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-2 mb-12">
          {/* <CardTable color="light" /> */}
          <Outlet />
        </div>
        {/* <div className="w-full px-4 mb-12">
          <CardTable color="dark" />
        </div> */}
      </div>
    </>
  );
}
