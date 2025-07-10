import { FaHome, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";
import UserDropdown from "../Dropdowns/UserDropdown";

export default function StatsNavbar() {
  const { dataSearch, setDataSearch } = useAppMainContext();

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-10 flex items-center w-full p-4 bg-primary-default md:flex-row md:flex-nowrap md:justify-start">
        <div className="flex flex-wrap items-center justify-between w-full px-4 mx-autp md:flex-nowrap md:px-10">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <FaHome className="text-2xl text-white" />
            <a
              href="/"
              className="text-lg font-bold text-white transition-colors hover:text-blue-200"
            >
              Accueil
            </a>
          </div>
          {/* Form */}
          {/* User */}
          {/* <ul className="flex-col items-center hidden list-none md:flex-row md:flex">
            <UserDropdown />
          </ul> */}
        </div>
      </nav>
      {/* End StatsNavbar */}
    </>
  );
}
