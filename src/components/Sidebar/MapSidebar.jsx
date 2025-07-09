/*eslint-disable*/
import { Link } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUser, FaCheck } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";
import pharmacieIcon from "../../assets/markers/doctors_bag_32px.png";
import restaurantIcon from "../../assets/markers/restaurant_32px.png";
import enseignDeBaseIcon from "../../assets/markers/students_32px.png";
import ecolesMatPrimIcon from "../../assets/markers/children_32px.png";
import ensSecIcon from "../../assets/markers/student_male_32px.png";
import ensSupIcon from "../../assets/markers/graduation_cap_32px.png";
import eglCathIcon from "../../assets/markers/cross_32px.png";
import mosqueeIcon from "../../assets/markers/mosque_32px.png";
import nationsUniesIcon from "../../assets/markers/united_nations_32px.png";
import banquesIcon from "../../assets/markers/money_bag_32px.png";
import citesMunicipalesIcon from "../../assets/markers/business_building_32px.png";
import centreSpecialIcon from "../../assets/markers/building_32px.png";
import mairieIcon from "../../assets/markers/parliament_32px.png";
import prefAndSPrefIcon from "../../assets/markers/captain_skin_type_3_32px.png";
import ambassadeIcon from "../../assets/markers/embassy_32px.png";
import gendarmerieIcon from "../../assets/markers/soldier_man_32px.png";
import commissariatIcon from "../../assets/markers/air_force_commander_male_32px.png";
import boulangerieIcon from "../../assets/markers/bakery_32px.png";
import centreCulturelIcon from "../../assets/markers/folk_32px.png";
import hotelsIcon from "../../assets/markers/hotel_building_32px.png";
import monumentIcon from "../../assets/markers/statue_32px.png";
import lieuxRemIcon from "../../assets/markers/place_marker_32px.png";
import aubergesIcon from "../../assets/markers/bedroom_32px.png";
import bouchesIncendiesIcon from "../../assets/markers/fire_hydrant_32px.png";
import garageIcon from "../../assets/markers/garage_32px.png";
import sportIcon from "../../assets/markers/gym_32px.png";
import sapeurPompierIcon from "../../assets/markers/firefighter_32px.png";
import laverieIcon from "../../assets/markers/automatic_car_wash_32px.png";
import stationServiceIcon from "../../assets/markers/gas_station_32px.png";
import agenceDeVoyageIcon from "../../assets/markers/trolleybus_32px.png";

export default function MapSidebar() {
    const { selectedLayers, setSelectedLayers } = useAppMainContext();
    const [collapseShow, setCollapseShow] = useState("hidden");

    // Définition de toutes les couches disponibles (nom, label, icône, attribution)
    const allLayers = [
      { url: "/gis/centres-sante", name: "centre_sante", label: "Centre de sante", icon: <img src={pharmacieIcon} alt="Centre de sante" className="inline w-5 h-5 mr-2" />, attrib: "Centre de sante" },
      { url: "/gis/eglises", name: "eglises", label: "Eglises", icon: <img src={eglCathIcon} alt="Eglises" className="inline w-5 h-5 mr-2" />, attrib: "Eglises" },
      { url: "/gis/enseignement", name: "enseignement", label: "Enseignement", icon: <img src={ensSecIcon} alt="Enseignement" className="inline w-5 h-5 mr-2" />, attrib: "Enseignement" },
      { url: "/gis/hebergements", name: "hebergements", label: "Hebergements", icon: <img src={hotelsIcon} alt="Hebergement" className="inline w-5 h-5 mr-2" />, attrib: "Hebergement" },
      { url: "/gis/securite", name: "securite", label: "Securite", icon: <img src={commissariatIcon} alt="Securite" className="inline w-5 h-5 mr-2" />, attrib: "Securite" },
      { url: "/gis/services-publiques", name: "services_publiques", label: "services publiques", icon: <img src={stationServiceIcon} alt="Service Publique" className="inline w-5 h-5 mr-2" />, attrib: "Service Publique" },
      
      { url: "/gis/communes", name: "communes", label: "Communes", icon: null, attrib: "Communes" },
      { url: "/gis/departements", name: "departements", label: "Departements", icon: null, attrib: "Departements" },
      { url: "/gis/regions", name: "regions", label: "Regions", icon: null, attrib: "Regions" },
      { url: "/gis/hydrographie", name: "hydrographie", label: "Hydrographie", icon: null, attrib: "Hydrographie" },
      { url: "/gis/routes", name: "routes", label: "Routes", icon: null, attrib: "Routes" },
    ];

    // Gestion du changement de case à cocher
    const handleCheckboxChange = (layer) => {
      const alreadyChecked = selectedLayers.find(l => l.name === layer.name);
      if (alreadyChecked) {
        setSelectedLayers(selectedLayers.filter(l => l.name !== layer.name));
      } else {
        setSelectedLayers([...selectedLayers, layer]);
      }
    };

    // Pour chaque catégorie, filtrer les couches
    /*const categories = [
      { title: "Education", filter: l => ["enseignement_de_base_font_point","ecoles_mat_primaire_point","enseignements_secondaires_final_point","enseignement_superieur_custom_point"].includes(l.name) },
      { title: "Sante", filter: l => ["pharmacies_point"].includes(l.name) },
      { title: "Religion", filter: l => ["eglises_catholiques_font_point","eglises_presbyteriennes_font_point","eglises_protestantes_point","mosquees_font_point"].includes(l.name) },
      { title: "Services Publiques", filter: l => ["nations_unies_point","banques_et_microfinances_custom_point","cites_municipales_cuy_point","centre_special_detat_civil_font_point","mairies_yaounde_custom_point","prefectures_sous-prefectures_custom_point","ambassades_point"].includes(l.name) },
      { title: "Securite", filter: l => ["gendarmeries_point","commissariats_yde_font_point"].includes(l.name) },
      { title: "Autres", filter: l => ["restaurants_yaounde_font_point","boulangeries_custom_point","centres_culturels_custom_point","hotels_font_point","monuments_custom_point","lieux_remarquables_point","auberges_custom_point","bouches_incendies_yde_custom_point","garages_custom_point","complexes_sportifs_custom_point","sapeurs_pompier_point","laveries_font_point","stations_sevices_font_point","agences_de_voyages_font_point"].includes(l.name) },
    ];*/
    const categories = [
      { title: "Services", filter: l => [
                                  "centre_sante",
                                  "eglises",
                                  "enseignement",
                                  "hebergements",
                                  "securite",
                                  "services_publiques"].includes(l.name) },

      { title: "Autres", filter: l => [
                                "communes",
                                "departements",
                                "regions",
                                "hydrographie",
                                "routes"].includes(l.name) },
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
              {/* Catégories dynamiques */}
              <div className={
                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }>
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
                
                {categories.map(cat => (
                  <div key={cat.title}>
                    <hr className="my-4 md:min-w-full" />
                    <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">{cat.title}</h6>
                    <ul className="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
                      {allLayers.filter(cat.filter).map(layer => {
                        const isChecked = !!selectedLayers.find(l => l.name === layer.name);
                        return (
                          <li className="items-center" key={layer.name}>
                            <label
                              className={
                                `flex flex-row items-center py-3 pl-2 text-xs font-bold uppercase rounded cursor-pointer text-primary-dark hover:text-white hover:bg-primary-dark transition-colors duration-150 ` +
                                (isChecked ? 'bg-green-100 text-green-700' : '')
                              }
                            >
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(layer)}
                              />
                              <span className="flex items-center justify-center w-5 h-5 mr-2 border-2 border-green-500 rounded">
                                {isChecked && <FaCheck className="text-base text-green-600" />}
                              </span>
                              {layer.icon}
                              {layer.label}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </>
      );
}