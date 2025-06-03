import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaHome, FaUser, FaSignOutAlt, FaUserShield } from "react-icons/fa";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full shadow-md bg-white/60 backdrop-blur-md">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <Link
          className="text-2xl font-extrabold tracking-widest text-primary-default drop-shadow-lg"
          to="/"
        >
          WEB MAPPING
        </Link>
        <button
          className="text-2xl lg:hidden text-primary-default focus:outline-none"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <FaBars />
        </button>
        <div
          className={`${
            navbarOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:gap-6 w-full lg:w-auto mt-4 lg:mt-0 bg-white/80 lg:bg-transparent rounded-lg lg:rounded-none shadow-lg lg:shadow-none px-4 py-4 lg:p-0`}
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 font-semibold transition-colors rounded text-primary-dark hover:text-primary-default"
          >
            <FaHome /> Accueil
          </Link>
          <Link
            to="/users-administration"
            className="flex items-center gap-2 px-4 py-2 font-semibold transition-colors rounded text-primary-dark hover:text-primary-default"
          >
            <FaUserShield /> Admin
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 font-semibold transition-colors rounded text-primary-dark hover:text-primary-default"
          >
            <FaUser /> Profil
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 font-semibold text-red-500 transition-colors rounded hover:text-red-700"
          >
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
