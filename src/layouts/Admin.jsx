import { Outlet } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import HeaderStats from "../components/Headers/HeaderStats";
import FooterAdmin from "../components/Footers/FooterAdmin";

// views

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative bg-neutral-100 md:ml-64">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="w-full px-4 mx-auto -m-24 md:px-10">
          
          <Outlet />
          
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
