import { FaSearch } from "react-icons/fa";
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
          <a
            className="hidden text-sm font-semibold text-white uppercase md:inline-block"
            href="/"
          >
            Tableau de bord
          </a>
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
