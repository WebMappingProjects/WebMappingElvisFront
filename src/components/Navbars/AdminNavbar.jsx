import { FaSearch } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";
import UserDropdown from "../Dropdowns/UserDropdown";

export default function AdminNavbar() {
  const { dataSearch, setDataSearch } = useAppMainContext();

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-10 flex items-center w-full p-4 bg-transparent md:flex-row md:flex-nowrap md:justify-start">
        <div className="flex flex-wrap items-center justify-between w-full px-4 mx-autp md:flex-nowrap md:px-10">
          {/* Brand */}
          <a
            className="hidden text-sm font-semibold text-white uppercase md:inline-block"
            href="/"
          >
            Données du SIG
          </a>
          {/* Form */}
          <form className="flex-row flex-wrap items-center w-full mr-3 md:w-2/3 lg:w-1/4 md:flex lg:ml-auto">
            <div className="relative flex flex-wrap items-stretch w-full">
              <span className="absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-primary-light">
                <FaSearch className="text-primary-default" />
              </span>
              <input
                type="text"
                placeholder="Rechercher ici..."
                className="relative w-full px-3 py-3 pl-10 text-sm bg-white border-0 rounded shadow outline-none placeholder:text-primary-light text-primary-default focus:outline-none focus:ring-0"
                value={dataSearch}
                onChange={(e) => setDataSearch(e.target.value)}
              />
            </div>
          </form>
          {/* User */}
          {/* <ul className="flex-col items-center hidden list-none md:flex-row md:flex">
            <UserDropdown />
          </ul> */}
        </div>
      </nav>
      {/* End AdminNavbar */}
    </>
  );
}
