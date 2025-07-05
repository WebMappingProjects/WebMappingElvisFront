/*eslint-disable*/
import { Link, useNavigate } from "react-router-dom";
// components

import IndexDropdown from "../Dropdowns/IndexDropdown";
import { useEffect, useState } from "react";
import { FaAlignJustify, FaArrowCircleDown, FaBars, FaChartArea, FaFacebook, FaFileAlt, FaGithub, FaHamburger, FaPersonBooth, FaPlusCircle, FaPlusSquare, FaStackExchange, FaStackOverflow, FaTimes, FaTwitter, FaUnlock, FaUser, FaUserAltSlash, FaUserFriends, FaUserShield, FaUserTimes } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [ userDatas, setUserDatas ] = useState({ role: "lambda" });

  useEffect(() => {
    const loadUserDatas = () => {
        const user = JSON.parse(window.localStorage.getItem("authUser"));
        setUserDatas(user);
    }

    loadUserDatas();
  }, []);
  
  const handleLogout = (e) => {
      e.preventDefault();

      localStorage.clear();
      
      window.location.reload();
  }

  return (
    <>
      <nav className="fixed top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-3 bg-white shadow navbar-expand-lg">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="inline-block py-2 mr-4 text-lg font-bold leading-relaxed uppercase text-blueGray-700 whitespace-nowrap"
            >
              WEB MAPPING
            </Link>
            <button
              className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {navbarOpen ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col mr-auto list-none lg:flex-row">
              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-primary-default hover:text-primary-dark lg:py-2"
                  href="#dataTitleIdx"
                >
                  <FaFileAlt  className="mr-2 text-lg leading-1"/>
                  Données
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-primary-default hover:text-primary-dark lg:py-2"
                  href="#featuresTitleIdx"
                >
                  <FaStackOverflow  className="mr-2 text-lg leading-1"/>
                  Modules/Fonctionnalités
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase text-primary-default hover:text-primary-dark lg:py-2"
                  href="#statsTitleIdx"
                >
                  <FaChartArea  className="mr-2 text-lg leading-1"/>
                  Statistiques Globales
                </a>
              </li>
            </ul>
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              {/* <li className="flex items-center">
                <IndexDropdown />
              </li> */}
              {userDatas?.role == "admin" ? (
                <li className="flex items-center">
                  <a
                    className="flex items-center w-full px-3 py-4 text-xs font-bold uppercase cursor-pointer hover:text-primary-default lg:py-2 active:bg-primary-light"
                    href="/users-administration"
                  >
                    <FaUserShield className="mr-3 leading-1"/> Administration
                  </a>
                </li>
              ) : null }
              
              <li className="flex items-center">
                <a
                  className="flex items-center w-full px-3 py-4 text-xs font-bold uppercase cursor-pointer hover:text-primary-default lg:py-2 active:bg-primary-light"
                  href="/profile"
                >
                  <FaUser className="mr-3 leading-1"/> Profil
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="flex items-center w-full px-3 py-4 text-xs font-bold uppercase cursor-pointer hover:text-primary-default lg:py-2 active:bg-primary-light"
                  onClick={(e) => handleLogout(e)}
                >
                  <FaUnlock className="mr-3 leading-1"/> Déconnexion
                </a>
              </li>

              {/* <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-primary-default lg:py-2"
                  href="#"
                  target="_blank"
                >
                  <FaFacebook className="text-lg leading-1 " />
                  <span className="inline-block ml-2 lg:hidden">Partager</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-primary-default lg:py-2"
                  href="#"
                  target="_blank"
                >
                  <FaTwitter className="text-lg leading-1 " />
                  <span className="inline-block ml-2 lg:hidden">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase hover:text-primary-default lg:py-2"
                  href="#"
                  target="_blank"
                >
                  <FaGithub className="text-lg leading-1 " />
                  <span className="inline-block ml-2 lg:hidden">Liker</span>
                </a>
              </li> */}

              {/* <li className="flex items-center">
                <button
                  className="px-4 py-2 mb-3 ml-3 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none cursor-pointer bg-primary-default active:bg-primary-dark hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0"
                  type="button"
                >
                  <FaUnlock /> Connexion
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
