/*eslint-disable*/
import { Link } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useState } from "react";
import { FaBars, FaBreadSlice, FaBuilding, FaCar, FaChargingStation, FaCreditCard, FaHamburger, FaHotel, FaMoneyBill, FaMosque, FaPersonBooth, FaPiggyBank, FaPlus, FaRunning, FaSchool, FaServicestack, FaTimes, FaTruck, FaUniversity, FaUser, FaUserAlt, FaUserCog, FaUserGraduate, FaUserInjured } from "react-icons/fa";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
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
          {/* User */}
          <ul className="flex flex-wrap items-center list-none md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
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
            <form className="mt-6 mb-4 md:hidden">
              <div className="pt-0 mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-12 px-3 py-2 text-base font-normal leading-snug bg-white border border-solid rounded shadow-none outline-none border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 focus:outline-none"
                />
              </div>
            </form>










            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
              Education
            </h6>
            {/* Navigation */}

            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/ecoles-mat-prim"
                >
                  <FaSchool className="mr-2 text-sm"/>
                  Ecoles maternelles et primaires
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/ens-sec"
                >
                  <FaSchool className="mr-2 text-sm"/>
                  Enseignement Secondaire
                </Link>
              </li>
              
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/ens-sup"
                >
                  <FaUniversity className="mr-2 text-sm"/>
                  Enseignement superieur
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
              Sante
            </h6>
            {/* Navigation */}

            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/complex-sportif"
                >
                  <FaRunning className="mr-2 text-sm"/>
                  Complexes Sportifs
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/pharmacies"
                >
                  <FaPlus className="mr-2 text-sm"/>
                  Pharmacies
                </Link>
              </li>
            </ul>








            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
              Religion
            </h6>
            {/* Navigation */}

            

            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/mosquee"
                >
                  <FaMosque className="mr-2 text-sm"/>
                  Mosquées
                </Link>
              </li>

              {/* <li className="items-center">
                <Link
                  className="block py-3 text-xs font-bold uppercase text-blueGray-700 hover:text-blueGray-500"
                  to="/profile"
                >
                  <i className="mr-2 text-sm fas fa-user-circle text-blueGray-400"></i>{" "}
                  Profile Page
                </Link>
              </li> */}
            </ul>
            








            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
              Services Publiques
            </h6>
            {/* Navigation */}

            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/nations-unies"
                >
                  <FaServicestack className="mr-2 text-sm"/>
                  Nations Unies
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/sapeurpompier"
                >
                  <FaTruck className="mr-2 text-sm"/>
                  Sapeur pompier
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/laveries"
                >
                  <FaCar className="mr-2 text-sm"/>
                  Laveries
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/stations-services"
                >
                  <FaChargingStation className="mr-2 text-sm"/>
                  Stations Services
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/banques-microfinances"
                >
                  <FaMoneyBill className="mr-2 text-sm"/>
                  Banques et microfinances
                </Link>
              </li>
              
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/cites-municipales"
                >
                  <FaBuilding className="mr-2 text-sm"/>
                  Cites Municipales
                </Link>
              </li>
            </ul>






            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
              Securite
            </h6>
            {/* Navigation */}

            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/gendarmeries"
                >
                  <FaUser className="mr-2 text-sm"/>
                  Gendarmeries
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/commissariats"
                >
                  <FaUser className="mr-2 text-sm"/>
                  Commissariats
                </Link>
              </li>
              
            </ul>








            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
              Autres
            </h6>
            {/* Navigation */}

            <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/restaurants"
                >
                  <FaHamburger className="mr-2 text-sm"/>
                  Restaurants
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/boulangeries"
                >
                  <FaBreadSlice className="mr-2 text-sm"/>
                  Boulangeries
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/centres-culturels"
                >
                  <FaBuilding className="mr-2 text-sm"/>
                  Centres Culturels
                </Link>
              </li>
              
              <li className="items-center">
                <Link
                  className="flex flex-row py-3 pl-2 text-xs font-bold uppercase rounded text-primary-dark hover:text-white hover:bg-primary-dark"
                  to="/admin/tables/hotels"
                >
                  <FaHotel className="mr-2 text-sm"/>
                  Hotels
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}
