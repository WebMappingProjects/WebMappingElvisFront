/*eslint-disable*/
import { Link } from "react-router-dom";

// components

import PagesDropdown from "../Dropdowns/PagesDropdown";
import { useState } from "react";
import { FaBars, FaFacebook, FaFileAlt, FaHome } from "react-icons/fa";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(true);
  return (
    <>
      <nav className="absolute top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-3 navbar-expand-lg">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="inline-block py-2 mr-4 text-sm font-bold leading-relaxed text-white uppercase whitespace-nowrap"
              to="/"
            >
              WEB MAPPING
            </Link>
            {/* <button
              className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
              <FaBars className="text-white" />
            </button> */}
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            {/* <ul className="flex flex-col mr-auto list-none lg:flex-row">
              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase lg:text-neutral-400 lg:hover:text-primary-light text-primary-dark lg:py-2"
                  href="/"
                >
                  <FaHome className="mr-2 text-lg lg:text-primary-default text-primary-default leading-lg" />
                  Accueil
                </a>
              </li>
            </ul>
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              <li className="flex items-center">
                <PagesDropdown />
              </li>
              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase lg:text-neutral-400 lg:hover:text-primary-light text-primary-dark lg:py-2"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                >
                  <FaFacebook className="mr-2 text-lg lg:text-primary-default text-primary-default leading-lg" />
                  <span className="inline-block ml-2 lg:hidden">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase lg:text-neutral-400 lg:hover:text-primary-light text-primary-dark lg:py-2"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                  target="_blank"
                >
                  <i className="text-lg lg:text-blueGray-200 text-blueGray-400 fab fa-twitter leading-lg " />
                  <span className="inline-block ml-2 lg:hidden">Tweet</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="flex items-center px-3 py-4 text-xs font-bold uppercase lg:text-neutral-400 lg:hover:text-primary-light text-primary-dark lg:py-2"
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-auth-navbar"
                  target="_blank"
                >
                  <i className="text-lg lg:text-blueGray-200 text-blueGray-400 fab fa-github leading-lg " />
                  <span className="inline-block ml-2 lg:hidden">Star</span>
                </a>
              </li>

              <li className="flex items-center">
                <button
                  className="px-4 py-2 mb-3 ml-3 text-xs font-bold uppercase transition-all duration-150 ease-linear bg-white rounded shadow outline-none text-blueGray-700 active:bg-blueGray-50 hover:shadow-md focus:outline-none lg:mr-1 lg:mb-0"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </button>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}
