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
import { motion } from "framer-motion";

export default function Index() {

  return (
    <>
      <IndexNavbar fixed /> 
      {/* HERO SECTION AMÉLIORÉE */}
      <section className="relative flex items-center min-h-screen pt-16 overflow-hidden header max-h-860-px bg-gradient-to-br from-primary-dark via-primary-default to-blueGray-700">
        <div className="absolute inset-0 z-0 bg-center bg-cover opacity-30 blur-sm" style={{backgroundImage: `url(${pattern_react})`}}></div>
        <div className="container z-20 flex flex-wrap items-center mx-auto">
          <div className="w-full px-4 md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="pt-20 md:pt-32 sm:pt-0 animate-fade-in-up">
              <h2 className="text-2xl font-extrabold text-white md:text-5xl drop-shadow-lg">
                MaKarte - <em className="text-primary-light-op">Plateforme de manipulation des données géospatiales du SIG.</em>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-justify md:text-base md:text-left text-white/90">
                Cette plateforme s'appuie sur un ensemble de données géospatiales collectées par des experts afin de faciliter l'accès du grand public aux différents services disponibles dans le département du Mfoundi, situé dans la région du Centre Cameroun.
              </p>
              <div className="flex gap-4 mt-12 mb-4">
                <Link
                  to="/map"
                  className="px-8 py-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-600 rounded shadow-lg md:text-base hover:bg-primary-dark focus:outline-none"
                >
                  Découvrir la carte
                </Link>
                <a
                  href="#featuresTitleIdx"
                  className="px-8 py-4 text-sm font-bold uppercase transition-all duration-150 ease-linear bg-white border-2 rounded shadow-lg md:text-base text-primary-default hover:bg-primary-default hover:text-white border-primary-default focus:outline-none"
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
          {/* <svg
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
          </svg> */}
        </div>
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center mt-24 md:mt-0">
            <div className="w-10/12 px-2 mt-4 ml-auto mr-auto md:w-6/12 lg:w-4/12 md:px-4">
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

      {/* MODULES/FONCTIONNALITÉS EN CARDS MODERNES */}
      <section className="relative block z-1 bg-primary-light-op">
        <div className="container py-20 mx-auto">
          <h2 className="mb-12 text-4xl font-semibold text-center text-black" id="featuresTitleIdx">Modules / Fonctionnalités</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Carte interactive */}
            <div className="flex flex-col items-center w-full max-w-xs p-8 transition-transform duration-200 shadow-2xl bg-white/90 rounded-2xl hover:scale-105 group">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 text-4xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                <FaSitemap />
              </div>
              <h5 className="mb-2 text-xl font-bold text-center text-primary-dark">Carte interactive (Géoportail)</h5>
              <p className="mb-4 text-base text-center text-primary-dark">Explorez, visualisez et interagissez avec les données géospatiales sur une carte dynamique et intuitive.</p>
              <Link to="/map" className="px-6 py-2 mt-auto text-sm font-bold text-white uppercase transition-colors rounded bg-primary-default hover:bg-primary-dark">Accéder</Link>
            </div>
            {/* Données géospatiales */}
            <div className="flex flex-col items-center w-full max-w-xs p-8 transition-transform duration-200 shadow-2xl bg-white/90 rounded-2xl hover:scale-105 group">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 text-4xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                <FaBuilding />
              </div>
              <h5 className="mb-2 text-xl font-bold text-center text-primary-dark">Données géospatiales</h5>
              <p className="mb-4 text-base text-center text-primary-dark">Consultez, filtrez et analysez toutes les données géospatiales disponibles sur la plateforme.</p>
              <Link to="/admin/tables" className="px-6 py-2 mt-auto text-sm font-bold text-white uppercase transition-colors rounded bg-primary-default hover:bg-primary-dark">Accéder</Link>
            </div>
            {/* Statistiques */}
            <div className="flex flex-col items-center w-full max-w-xs p-8 transition-transform duration-200 shadow-2xl bg-white/90 rounded-2xl hover:scale-105 group">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-4 text-4xl text-white transition-colors rounded-full shadow-lg bg-primary-default group-hover:bg-primary-dark">
                <FaCodeBranch />
              </div>
              <h5 className="mb-2 text-xl font-bold text-center text-primary-dark">Statistiques</h5>
              <p className="mb-4 text-base text-center text-primary-dark">Visualisez des statistiques globales et détaillées sur les données et l'utilisation de la plateforme.</p>
              <Link to="/stats" className="px-6 py-2 mt-auto text-sm font-bold text-white uppercase transition-colors rounded bg-primary-default hover:bg-primary-dark">Accéder</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTIQUES GLOBALES AVEC COMPTEURS ANIMÉS */}
      <section className="relative mt-20 overflow-hidden bg-primary-dark" id="statSection">
        <div className="absolute z-0 w-full h-full bg-primary-dark-op backdrop-blur-sm"></div>
        <div className="container relative z-10 pb-64 mx-auto">
          <div className="flex flex-wrap justify-center">
            <h2 className="text-4xl pt-[70px] font-semibold text-center w-full text-white mb-12" id="statsTitleIdx">Statistiques Globales</h2>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-12 mx-auto md:grid-cols-3">
              {/* Exemple de compteur animé */}
              <div className="flex flex-col items-center p-8 shadow-xl bg-white/90 rounded-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white rounded-full shadow-lg bg-primary-default">
                  <FaBuilding />
                </div>
                <span className="text-4xl font-extrabold text-primary-dark animate-pulse">+120</span>
                <span className="mt-2 text-lg font-semibold text-primary-dark">Structures administratives</span>
              </div>
              <div className="flex flex-col items-center p-8 shadow-xl bg-white/90 rounded-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white rounded-full shadow-lg bg-primary-default">
                  <FaSchool />
                </div>
                <span className="text-4xl font-extrabold text-primary-dark animate-pulse">+300</span>
                <span className="mt-2 text-lg font-semibold text-primary-dark">Établissements scolaires</span>
              </div>
              <div className="flex flex-col items-center p-8 shadow-xl bg-white/90 rounded-2xl">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-3xl text-white rounded-full shadow-lg bg-primary-default">
                  <FaPlusSquare />
                </div>
                <span className="text-4xl font-extrabold text-primary-dark animate-pulse">+50</span>
                <span className="mt-2 text-lg font-semibold text-primary-dark">Structures de santé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-10">

      </section>

      {/* SECTION CONSEIL REGIONAL DU CENTRE MODERNISÉE */}
      {/* <section className="relative mt-20 overflow-hidden bg-gradient-to-br from-primary-dark via-primary-default to-blueGray-700" id="crcSection">
        <div className="absolute inset-0 z-0 bg-center bg-cover opacity-20 blur-sm" style={{backgroundImage: `url(${pattern_react})`}}></div>
        <div className="container relative z-10 flex flex-wrap items-center justify-center gap-12 pb-20 mx-auto">
          <div className="w-full px-12 mt-24 md:w-4/12 md:mt-48">
            <div className="inline-flex items-center justify-center w-20 h-20 p-3 mb-6 text-center border-4 rounded-full shadow-2xl bg-white/90 text-primary-dark border-primary-default">
              <FaSitemap className="text-3xl" />
            </div>
            <h3 className="mb-2 text-3xl font-semibold leading-normal text-white" id="crcTitleIdx">
              Conseil Régional du Centre
            </h3>
            <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-blueGray-100">
              Le Conseil Régional du Centre œuvre pour le développement local et la gestion des services sociaux et géospatiaux dans la région du Centre Cameroun.
            </p>
            <div className="flex flex-wrap gap-2 pb-6">
              <span className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded-full bg-white/80 text-primary-dark">Cameroun</span>
              <span className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded-full bg-white/80 text-primary-dark">Centre</span>
              <span className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded-full bg-white/80 text-primary-dark">Mfoundi</span>
              <span className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded-full bg-white/80 text-primary-dark">Services sociaux</span>
              <span className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded-full bg-white/80 text-primary-dark">Données Geospatiales</span>
            </div>
            <a
              href="#"
              className="font-bold underline transition-all duration-150 ease-linear text-primary-light hover:text-white"
            >
              En Savoir Plus
            </a>
          </div>
          <div className="flex justify-center w-full px-4 pt-24 md:w-5/12 md:pt-0">
            <img
              alt="Conseil régional du centre"
              className="max-w-full border-4 shadow-2xl rounded-2xl border-primary-default bg-white/80"
              style={{
                transform: "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
              }}
              src={component_btn}
            />
          </div>
        </div>
      </section> */}

      {/* FOOTER MODERNE */}
      <Footer />
      <style>{`
        body { font-family: 'Inter', 'Poppins', 'Segoe UI', Arial, sans-serif; }
        .text-primary-dark { color: #1e293b; }
        .bg-primary-default { background-color: #2563eb; }
        .bg-primary-dark { background-color: #1e293b; }
        .text-primary-light { color: #60a5fa; }
        .bg-primary-dark-op { background: rgba(30,41,59,0.85); }
        .drop-shadow-lg { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15)); }
      `}</style>
    </>
  );
}
