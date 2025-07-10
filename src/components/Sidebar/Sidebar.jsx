/*eslint-disable*/
import { Link } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useState } from "react";
import { FaBars, FaBreadSlice, FaBuilding, FaCar, FaChargingStation, FaChurch, FaCog, FaCreditCard, FaCross, FaHamburger, FaHandsHelping, FaHome, FaHospital, FaHotel, FaMap, FaMoneyBill, FaMosque, FaPersonBooth, FaPiggyBank, FaPlus, FaRoad, FaRunning, FaSchool, FaServicestack, FaShieldAlt, FaTimes, FaTruck, FaUniversity, FaUser, FaUserAlt, FaUserCog, FaUserGraduate, FaUserInjured, FaWater, FaChevronDown, FaChevronUp, FaMapMarkedAlt } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [expandedSection, setExpandedSection] = useState({ services: true, entities: true });
  const { dataSearch, setDataSearch } = useAppMainContext();

  const mainServices = [
    { name: "Santé", icon: <FaHospital className="mr-3 text-base" />, route: "/admin/tables/centre-sante" },
    { name: "Église", icon: <FaChurch className="mr-3 text-base" />, route: "/admin/tables/eglises" },
    { name: "Enseignement", icon: <FaSchool className="mr-3 text-base" />, route: "/admin/tables/enseignement" },
    { name: "Hébergement", icon: <FaHome className="mr-3 text-base" />, route: "/admin/tables/hebergement" },
    { name: "Sécurité", icon: <FaShieldAlt className="mr-3 text-base" />, route: "/admin/tables/securite" },
    { name: "Services publics", icon: <FaServicestack className="mr-3 text-base" />, route: "/admin/tables/services-publiques" },
  ];

  const appEntities = [
    { name: "Communes", icon: <FaBuilding className="mr-3 text-base" />, route: "/admin/tables/communes" },
    { name: "Departements", icon: <FaUniversity className="mr-3 text-base" />, route: "/admin/tables/departements" },
    { name: "Region", icon: <FaMap className="mr-3 text-base" />, route: "/admin/tables/regions" },
    { name: "Hydrographie", icon: <FaWater className="mr-3 text-base" />, route: "/admin/tables/hydrographie" },
    { name: "Routes", icon: <FaRoad className="mr-3 text-base" />, route: "/admin/tables/routes" },
    { name: "Projets Communautaires", icon: <FaHandsHelping className="mr-3 text-base" />, route: "/admin/tables/projets" },
    { name: "Conseillers Regionaux", icon: <FaUserAlt className="mr-3 text-base" />, route: "/admin/tables/conseillers" },
  ];

  const toggleSection = (section) => {
    setExpandedSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <>
      <nav className="relative z-[1001] flex flex-wrap items-center justify-between px-0 py-0 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-72">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
          {/* Toggler */}
          <button
            className="px-3 py-1 text-xl leading-none text-white transition-opacity bg-transparent border border-transparent border-solid rounded cursor-pointer opacity-70 md:hidden hover:opacity-100"
            type="button"
            onClick={() => setCollapseShow("bg-gradient-to-b from-slate-800 to-slate-900 m-2 py-3 px-6 rounded-lg shadow-lg")}
          >
            <FaBars />
          </button>

          {/* Brand */}
          <Link
            className="inline-block p-6 px-6 mr-0 text-lg font-bold text-left text-white uppercase transition-colors md:block md:pb-4 whitespace-nowrap hover:text-blue-300"
            to="/"
          >
            <FaMapMarkedAlt className="inline ml-4"/> Tables de données
          </Link>
          
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-slate-600">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-white uppercase md:block md:pb-2 whitespace-nowrap"
                    to="/"
                  >
                    Services
                  </Link>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-white transition-opacity bg-transparent border border-transparent border-solid rounded cursor-pointer opacity-70 md:hidden hover:opacity-100"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <form className="px-6 mb-6 md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full h-10 px-4 py-2 text-sm text-white transition-all border rounded-lg bg-slate-700 border-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dataSearch}
                  onChange={(e) => setDataSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>

            {/* Services Section */}
            <div className="px-6 mb-6">
              <button
                onClick={() => toggleSection('services')}
                className="flex items-center justify-between w-full pb-3 mb-4 text-left border-b cursor-pointer border-slate-600"
              >
                <h6 className="flex items-center text-sm font-semibold tracking-wide text-blue-300 uppercase">
                  <FaCog className="mr-2 text-sm" />
                  Services disponibles
                </h6>
                {expandedSection.services ? 
                  <FaChevronUp className="text-xs text-slate-400" /> : 
                  <FaChevronDown className="text-xs text-slate-400" />
                }
              </button>
              
              {expandedSection.services && (
                <ul className="space-y-1">
                  {mainServices.map((service) => (
                    <li key={service.name}>
                      <Link 
                        className="flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white group"
                        to={service.route}
                      >
                        <span className="text-blue-400 group-hover:text-blue-300">
                          {service.icon}
                        </span>
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Entities Section */}
            <div className="px-6 mb-6">
              <button
                onClick={() => toggleSection('entities')}
                className="flex items-center justify-between w-full pb-3 mb-4 text-left border-b border-slate-600"
              >
                <h6 className="flex items-center text-sm font-semibold tracking-wide text-blue-300 uppercase">
                  <FaBuilding className="mr-2 text-sm" />
                  Gestion des entités
                </h6>
                {expandedSection.entities ? 
                  <FaChevronUp className="text-xs text-slate-400" /> : 
                  <FaChevronDown className="text-xs text-slate-400" />
                }
              </button>

              {expandedSection.entities && (
                <ul className="space-y-1">
                  {appEntities.map((entity) => (
                    <li key={entity.name}>
                      <Link 
                        className="flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white group"
                        to={entity.route}
                      >
                        <span className="text-green-400 group-hover:text-green-300">
                          {entity.icon}
                        </span>
                        {entity.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="flex-grow"></div>
            <div className="px-6 py-4 mt-auto border-t border-slate-600">
              <p className="text-xs text-center text-slate-400">
                © 2024 Dashboard Admin
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}