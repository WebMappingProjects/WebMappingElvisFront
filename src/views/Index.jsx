/*eslint-disable*/
import { Link } from "react-router-dom";

import IndexNavbar from "../components/Navbars/IndexNavbar";
import Footer from "../components/Footers/Footer";

import pattern_react from "../assets/img/pattern_react.png";
import component_btn from "../assets/img/component-btn.png";
import component_profile_card from "../assets/img/component-profile-card.png";
import component_info_card from "../assets/img/component-info-card.png";
import component_info_2 from "../assets/img/component-info-2.png";
import component_menu from "../assets/img/component-menu.png";
import component_btn_pink from "../assets/img/component-btn-pink.png";
import documentation from "../assets/img/documentation.png";
import map_screen from "../assets/img/map-screen.png";
import tables_screen from "../assets/img/tables-screen.png";
import landing from "../assets/img/landing.jpg";
import centre_divisions from "../assets/img/960px-Centre_divisions.png";
import { FaBuilding, FaCodeBranch, FaCross, FaDraftingCompass, FaHotel, FaList, FaPlusSquare, FaRunning, FaSchool, FaShieldAlt, FaSitemap } from "react-icons/fa";
import SimpleMessagePopup from "../components/popups/SimpleMessagePopup";

export default function Index() {

  return (
    <>
      <IndexNavbar fixed />
      {/* HERO SECTION AMÉLIORÉE */}
      <section className="relative flex items-center h-screen pt-16 overflow-hidden header max-h-860-px bg-gradient-to-br from-primary-dark via-primary-default to-blueGray-700">
        <div className="absolute inset-0 z-0 bg-center bg-cover opacity-30 blur-sm" style={{backgroundImage: `url(${pattern_react})`}}></div>
        <div className="container z-20 flex flex-wrap items-center mx-auto">
          <div className="w-full px-4 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="pt-20 md:pt-32 sm:pt-0 animate-fade-in-up">
              <h2 className="text-3xl font-extrabold text-white md:text-5xl drop-shadow-lg">
                WEB MAPPING - <em className="text-primary-light">Plateforme de manipulation des données géospatiales du SIG.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-justify md:text-left md:text-xl text-white/90">
                Cette plateforme s'appuie sur un ensemble de données géospatiales collectées par des experts afin de faciliter l'accès du grand public aux différents services disponibles dans le département du Mfoundi, situé dans la région du Centre Cameroun.
              </p>
              <div className="flex gap-4 mt-12">
                <Link
                  to="/map"
                  className="px-8 py-4 text-lg font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow-lg bg-primary-default hover:bg-primary-dark focus:outline-none animate-bounce-in"
                >
                  Découvrir la carte
                </Link>
                <a
                  href="#featuresTitleIdx"
                  className="px-8 py-4 text-lg font-bold uppercase transition-all duration-150 ease-linear bg-white border-2 rounded shadow-lg text-primary-default hover:bg-primary-default hover:text-white border-primary-default focus:outline-none"
                >
                  En Savoir Plus
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FIN HERO SECTION */}

      {/* SERVICES/SECTEURS EN CARTES MODERNES */}
      <section className="relative pb-40 mt-0 bg-neutral-200 md:mt-0">
        <div
          className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-current text-neutral-700"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center mt-24 md:mt-0">
            <div className="w-10/12 px-2 ml-auto mr-auto -mt-32 md:w-6/12 lg:w-4/12 md:px-4">
              <div className="relative flex flex-col w-full min-w-0 mb-6 break-words rounded-lg shadow-lg bg-primary-dark">
                <img
                  alt="..."
                  src={ centre_divisions }
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <h4 className="text-xl font-bold text-white">
                    Présentation de la plateforme
                  </h4>
                  <p className="mt-2 font-light text-white text-md">
                    Découvrez notre GeoPortail Évolutif, une plateforme dynamique qui vous permet d'explorer, d'analyser et de modifier des données géographiques. Que vous soyez un professionnel ou un amateur, notre interface intuitive vous offre un accès facile à une multitude d'informations géospatiales.
                  </p>
                </blockquote>
              </div>
            </div>
            <div className="w-full px-4 md:w-6/12">
              <h2 className="text-4xl pt-[70px] font-semibold" id="dataTitleIdx">Données</h2>
              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                {/* Carte Education */}
                <div className="flex flex-col items-center p-6 transition-transform duration-200 shadow-xl bg-white/80 rounded-xl hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                    <FaSchool />
                  </div>
                  <h6 className="mb-1 text-xl font-semibold text-primary-dark">Education</h6>
                  <p className="mb-2 text-base text-center text-primary-dark">Structures publiques et privées d'enseignement de base, secondaire et supérieurs,...</p>
                </div>
                {/* Carte Santé */}
                <div className="flex flex-col items-center p-6 transition-transform duration-200 shadow-xl bg-white/80 rounded-xl hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                    <FaPlusSquare />
                  </div>
                  <h6 className="mb-1 text-xl font-semibold text-primary-dark">Santé</h6>
                  <p className="mb-2 text-base text-center text-primary-dark">Services de santé (hôpitaux, pharmacies,...)</p>
                </div>
                {/* Carte Bâtiments */}
                <div className="flex flex-col items-center p-6 transition-transform duration-200 shadow-xl bg-white/80 rounded-xl hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                    <FaBuilding />
                  </div>
                  <h6 className="mb-1 text-xl font-semibold text-primary-dark">Bâtiments administratifs</h6>
                  <p className="mb-2 text-base text-center text-primary-dark">Services administratifs (ministères, délégations,...)</p>
                </div>
                {/* Carte Hôtels */}
                <div className="flex flex-col items-center p-6 transition-transform duration-200 shadow-xl bg-white/80 rounded-xl hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                    <FaHotel />
                  </div>
                  <h6 className="mb-1 text-xl font-semibold text-primary-dark">Hôtels</h6>
                  <p className="mb-2 text-base text-center text-primary-dark">Hôtels</p>
                </div>
                {/* Carte Religion */}
                <div className="flex flex-col items-center p-6 transition-transform duration-200 shadow-xl bg-white/80 rounded-xl hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                    <FaCross />
                  </div>
                  <h6 className="mb-1 text-xl font-semibold text-primary-dark">Religion</h6>
                  <p className="mb-2 text-base text-center text-primary-dark">Structures religieuses (chapelles, mosquées, ...)</p>
                </div>
                {/* Carte Sécurité */}
                <div className="flex flex-col items-center p-6 transition-transform duration-200 shadow-xl bg-white/80 rounded-xl hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                    <FaShieldAlt />
                  </div>
                  <h6 className="mb-1 text-xl font-semibold text-primary-dark">Sécurité</h6>
                  <p className="mb-2 text-base text-center text-primary-dark">Structures en charge de la sécurité (poste de police, commissariat, ...)</p>
                </div>
                {/* Carte Sport */}
                <div className="flex flex-col items-center p-6 transition-transform duration-200 shadow-xl bg-white/80 rounded-xl hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                    <FaRunning />
                  </div>
                  <h6 className="mb-1 text-xl font-semibold text-primary-dark">Sport</h6>
                  <p className="mb-2 text-base text-center text-primary-dark">Salles de sport,...</p>
                </div>
                {/* Carte Autres */}
                <div className="flex flex-col items-center p-6 transition-transform duration-200 shadow-xl bg-white/80 rounded-xl hover:scale-105 group">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                    <FaList />
                  </div>
                  <h6 className="mb-1 text-xl font-semibold text-primary-dark">Autres</h6>
                  <p className="mb-2 text-base text-center text-primary-dark">Autres structures et services (restaurants, laveries, agences de voyages, ...)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ...existing code... */}
      </section>

      <section className="relative block z-1 bg-primary-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 -mt-24 lg:w-12/12">
              <div className="flex flex-wrap">
                <div className="w-full px-4 lg:w-4/12">
                  <h5 className="pb-4 text-xl font-semibold text-center">
                    Carte interactive (Géoportail)
                  </h5>
                  {/* <Link to="/auth/login"> */}
                  <Link to="/map">
                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words transition-all duration-150 ease-linear bg-white rounded-lg shadow-lg hover:-mt-4">
                      <img
                        alt="..."
                        className="h-auto max-w-full align-middle border-none rounded-lg md:h-[250px]"
                        src={ map_screen }
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full px-4 lg:w-4/12">
                  <h5 className="pb-4 text-xl font-semibold text-center">
                    Données géospatiales
                  </h5>
                  <Link to="/admin/tables">
                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words transition-all duration-150 ease-linear bg-white rounded-lg shadow-lg hover:-mt-4">
                      <img
                        alt="..."
                        className="max-w-full align-middle border-none rounded-lg h-auto md:h-[250px]"
                        src={ tables_screen }
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full px-4 lg:w-4/12">
                  <h5 className="pb-4 text-xl font-semibold text-center">
                    Statistiques
                  </h5>
                  <Link to="/landing">
                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words transition-all duration-150 ease-linear bg-white rounded-lg shadow-lg hover:-mt-4">
                      <img
                        alt="..."
                        className="h-auto max-w-full align-middle border-none rounded-lg md:h-[250px]"
                        src={landing}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-20 overflow-hidden bg-primary-dark" id="statSection">
        <div className="absolute z-0 w-full h-full bg-primary-dark-op backdrop-blur-sm"></div>
        <div className="container relative z-10 pb-64 mx-auto">
          <div className="flex flex-wrap justify-center">
            
            <h2 className="text-4xl pt-[70px] font-semibold text-center w-full text-white" id="statsTitleIdx">Statistiques Globales</h2>

            <div className="w-full px-12 ml-auto mr-auto md:w-5/12 md:px-4 md:mt-32">
              <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-primary-dark">
                <FaCodeBranch />
              </div>
              <h3 className="mb-2 text-3xl font-semibold leading-normal text-white">
                Statistiques Globales
              </h3>
              <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-primary-light">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non corrupti blanditiis iure incidunt, porro, quas sit repellat dolore modi possimus aut officia, neque sint labore? Eos dolore ratione pariatur.
              </p>
              <a
                href="#"
                className="inline-block px-6 py-4 mt-4 mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none github-star focus:outline-none bg-blueGray-700 active:bg-blueGray-600 hover:shadow-lg"
              >
                Plus...
              </a>
            </div>

            <div className="relative w-full px-4 mt-32 ml-auto mr-auto md:w-4/12">
              <i className="absolute left-auto fab fa-github text-blueGray-700 -top-150-px -right-100 opacity-80 text-55"></i>
            </div>
          </div>
        </div>
      </section>
      
      <section className="relative mt-10">

        {/*  */}
        <div className="container pb-20 mx-auto overflow-hidden">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-12 mt-48 ml-auto mr-auto md:w-4/12 md:px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-primary-dark">
                <i className="text-xl fas fa-sitemap"></i><FaSitemap className="text-xl" />
              </div>
              <h3 className="pt-[70px] mb-2 text-3xl font-semibold leading-normal" id="crcTitleIdx">
                Conseil Regional du centre
              </h3>
              <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-blueGray-600">
                Le conseil regionnal du centre
              </p>
              <div className="block pb-6">
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  Cameroun
                </span>
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  Centre
                </span>
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  Mfoundi
                </span>
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  Services sociaux
                </span>
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  Données Geospatiales
                </span>
              </div>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=nr-index"
                target="_blank"
                className="font-bold transition-all duration-150 ease-linear text-blueGray-700 hover:text-primary-dark"
              >
                En Savoir Plus
              </a>
            </div>

            <div className="w-full px-4 mt-32 ml-auto mr-auto md:w-5/12">
              <div className="relative flex flex-col w-full min-w-0 mt-48 mb-6 md:mt-0">
                <img
                  alt="..."
                  src={component_btn}
                  className="absolute w-full align-middle rounded shadow-lg max-w-100-px z-3 left-145-px -top-29-px"
                />
                {/* <img
                  alt="..."
                  src={component_profile_card}
                  className="absolute w-full align-middle rounded-lg shadow-lg -top-160-px left-260-px max-w-210-px"
                /> */}
                {/* <img
                  alt="..."
                  src={component_info_card}
                  className="absolute w-full align-middle rounded-lg shadow-lg max-w-180-px -top-225-px left-40-px z-2"
                /> */}
                {/* <img
                  alt="..."
                  src={component_info_2}
                  className="absolute w-full align-middle rounded-lg shadow-2xl max-w-200-px -left-50-px top-25-px"
                /> */}
                {/* <img
                  alt="..."
                  src={component_menu}
                  className="absolute w-full align-middle rounded shadow-lg max-w-580-px -left-20-px top-210-px"
                />
                <img
                  alt="..."
                  src={component_btn_pink}
                  className="absolute w-full align-middle rounded shadow-xl max-w-120-px left-195-px top-95-px"
                /> */}
              </div>
            </div>
          </div>

          {/* <div className="flex flex-wrap items-center pt-32">
            <div className="w-full px-4 mt-32 ml-auto mr-auto md:w-6/12">
              <div className="relative flex flex-wrap justify-center">
                <div className="w-full px-4 my-4 lg:w-6/12">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 text-center bg-red-600 rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/svelte.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        Svelte
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 mt-8 text-center rounded-lg shadow-lg bg-lightBlue-500">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        ReactJS
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 mt-8 text-center rounded-lg shadow-lg bg-blueGray-700">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        NextJS
                      </p>
                    </div>
                  </a>
                </div>
                <div className="w-full px-4 my-4 lg:w-6/12 lg:mt-16">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 text-center bg-yellow-500 rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/js.png"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        JavaScript
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 mt-8 text-center bg-red-700 rounded-lg shadow-lg">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        Angular
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index"
                    target="_blank"
                  >
                    <div className="p-8 mt-8 text-center rounded-lg shadow-lg bg-emerald-500">
                      <img
                        alt="..."
                        className="w-16 max-w-full p-2 mx-auto bg-white rounded-full shadow-md"
                        src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg"
                      />
                      <p className="mt-4 text-lg font-semibold text-white">
                        Vue.js
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-12 mt-48 ml-auto mr-auto md:w-4/12 md:px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-primary-dark">
                <i className="text-xl fas fa-drafting-compass"></i>
                <FaDraftingCompass />
              </div>
              <h3 className="mb-2 text-3xl font-semibold leading-normal">
                Block 2
              </h3>
              <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-blueGray-600">
                Description bloc 2
              </p>
              <div className="block pb-6">
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  tag 1
                </span>
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  tag 2
                </span>
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  tag 3
                </span>
                <span className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-semibold uppercase bg-white rounded-full text-primary-dark last:mr-0">
                  tag 4
                </span>
              </div>
              <a
                href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=nr-index"
                target="_blank"
                className="font-bold transition-all duration-150 ease-linear text-blueGray-700 hover:text-primary-dark"
              >
                View all{" "}
                <i className="ml-1 leading-relaxed fa fa-angle-double-right"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container px-4 pt-48 pb-32 mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-12 ml-auto md:w-5/12 md:px-4">
              <div className="md:pr-12">
                <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center bg-white rounded-full shadow-lg text-primary-dark">
                  <i className="text-xl fas fa-file-alt"></i>
                </div>
                <h3 className="text-3xl font-semibold">
                  More description
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-primary-dark">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non corrupti blanditiis iure incidunt, porro, quas sit repellat dolore modi possimus aut officia, neque sint labore? Eos dolore ratione pariatur.
                </p>
                <ul className="mt-6 list-none">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-primary-dark bg-blueGray-50">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-primary-dark">
                          Built by Developers for Developers
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-primary-dark bg-blueGray-50">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-primary-dark">
                          Carefully crafted code for Components
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold uppercase rounded-full text-primary-dark bg-blueGray-50">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-primary-dark">
                          Dynamic Javascript Components
                        </h4>
                      </div>
                    </div>
                  </li>
                </div>
              </div>
            </div>

            <div className="w-full px-4 pt-24 mr-auto md:w-6/12 md:pt-0">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src={centre_divisions}
              />
            </div>
          </div>
        </div>
        {/*  */}
        </div>
      </section>

      <section className="relative pt-32 pb-16 bg-neutral-200">
        

        <div
          className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-current text-blueGray-200"
              points="2560 0 2560 100 0 100"
            ></polygon>
            </svg>
          </div>

          <div className="container mx-auto">
            <div className="relative z-10 flex flex-wrap justify-center px-12 py-16 -mt-64 bg-white rounded-lg shadow-xl">
              <div className="w-full text-center lg:w-8/12">
                <p className="text-4xl text-center">
                  <span role="img" aria-label="love">
                    😍
                  </span>
                </p>
                <h3 className="text-3xl font-semibold">
                  Do you love this Site ?
                </h3>
                <p className="mt-4 mb-4 text-lg leading-relaxed text-primary-dark">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non corrupti blanditiis iure incidunt, porro, quas sit repellat dolore modi possimus aut officia, neque sint labore? Eos dolore ratione pariatur.
                </p>
                <div className="flex flex-col mt-10 sm:block">
                  <a
                    href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index"
                    target="_blank"
                    className="px-6 py-4 mb-2 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none get-started focus:outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg"
                  >
                    Get started
                  </a>
                  <a
                    href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                    target="_blank"
                    className="px-6 py-4 mb-1 mr-1 text-sm font-bold text-white uppercase rounded shadow outline-none github-star sm:ml-1 focus:outline-none bg-blueGray-700 active:bg-blueGray-600 hover:shadow-lg"
                  >
                    <i className="mr-1 text-lg fab fa-github"></i>
                    <span>Help With a Star</span>
                  </a>
                </div>
                <div className="mt-16 text-center"></div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
    </>
  );
}
