/*eslint-disable*/
import { Link } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useState } from "react";
import { FaBars, FaBreadSlice, FaBuilding, FaCar, FaChargingStation, FaChurch, FaCog, FaCreditCard, FaCross, FaHamburger, FaHandsHelping, FaHome, FaHospital, FaHotel, FaMap, FaMoneyBill, FaMosque, FaPersonBooth, FaPiggyBank, FaPlus, FaRoad, FaRunning, FaSchool, FaServicestack, FaShieldAlt, FaTimes, FaTruck, FaUniversity, FaUser, FaUserAlt, FaUserCog, FaUserGraduate, FaUserInjured, FaWater } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const { dataSearch, setDataSearch } = useAppMainContext();

  const mainServices = [
    { name: "Santé", icon: <FaHospital className="mr-2 text-sm" />, route: "/admin/tables/centre-sante" },
    { name: "Église", icon: <FaChurch className="mr-2 text-sm" />, route: "/admin/tables/eglises" },
    { name: "Enseignement", icon: <FaSchool className="mr-2 text-sm" />, route: "/admin/tables/enseignement" },
    { name: "Hébergement", icon: <FaHome className="mr-2 text-sm" />, route: "/admin/tables/hebergement" },
    { name: "Sécurité", icon: <FaShieldAlt className="mr-2 text-sm" />, route: "/admin/tables/securite" },
    { name: "Services publics", icon: <FaServicestack className="mr-2 text-sm" />, route: "/admin/tables/services-publiques" },
  ];

  const appEntities = [
    { name: "Communes", icon: <FaBuilding className="mr-2 text-sm" />, route: "/admin/tables/communes" },
    { name: "Departements", icon: <FaUniversity className="mr-2 text-sm" />, route: "/admin/tables/departements" },
    { name: "Region", icon: <FaMap className="mr-2 text-sm" />, route: "/admin/tables/regions" },
    { name: "Hydrographie", icon: <FaWater className="mr-2 text-sm" />, route: "/admin/tables/hydrographie" },
    { name: "Routes", icon: <FaRoad className="mr-2 text-sm" />, route: "/admin/tables/routes" },
    { name: "Projets Communautaires", icon: <FaHandsHelping className="mr-2 text-sm" />, route: "/admin/tables/projets" },
  ];
  
  return (
    <>
      <nav className="relative z-[1001] flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
          {/* Toggler */}
          <button
            className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <FaBars />
          </button>


          {/* Brand */}
          <Link
            className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
            to="/"
          >
            Accueil
          </Link>
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap"
                    to="/"
                  >
                    Services
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="hidden mt-6 mb-4 md:hidden">
              <div className="pt-0 mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 px-3 py-2 text-base font-normal leading-snug bg-white border border-solid rounded shadow-none outline-none border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 focus:outline-none"
                  value={dataSearch}
                  onChange={(e) => setDataSearch(e.target.value)}
                />
              </div>
            </form>

            <div>
              <hr className="my-4 md:min-w-full" />
              <h6 className="flex flex-row items-center justify-center pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
                <FaCog className="mr-2 text-sm" />
                Services disponibles
              </h6>
              <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
                <li>
                  <hr />
                </li>
                {mainServices.map((service) => (
                  <li key={service.name} className="items-center">
                    <Link 
                      className="flex flex-row py-3 pl-2 my-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                      to={service.route}>
                      {service.icon}
                      {service.name}
                    </Link>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <hr className="my-4 md:min-w-full" />
              <h6 className="flex flex-row items-center justify-center pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
                <FaCog className="mr-2 text-sm" />
                Gestion des entités
              </h6>

              <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
                <li>
                  <hr />
                </li>
                {appEntities.map((service) => (
                  <li key={service.name} className="items-center">
                    <Link 
                      className="flex flex-row py-3 pl-2 my-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                      to={service.route}>
                      {service.icon}
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <hr />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
