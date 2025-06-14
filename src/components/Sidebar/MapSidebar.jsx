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
      // Education
      { url: "/gis/enseignement-de-base-font", name: "enseignement_de_base_font_point", label: "Enseignement de base", icon: <img src={enseignDeBaseIcon} alt="Enseignement de base" className="mr-2 w-5 h-5 inline" />, attrib: "Enseignement de base" },
      { url: "/gis/ecoles-mat-primaire", name: "ecoles_mat_primaire_point", label: "Ecoles maternelles et primaires", icon: <img src={ecolesMatPrimIcon} alt="Ecoles maternelles et primaires" className="mr-2 w-5 h-5 inline" />, attrib: "Ecoles Maternelles et Primaires" },
      { url: "/gis/enseignements-secondaires-final", name: "enseignements_secondaires_final_point", label: "Enseignement Secondaire", icon: <img src={ensSecIcon} alt="Enseignement Secondaire" className="mr-2 w-5 h-5 inline" />, attrib: "Enseignement Secondaire" },
      { url: "/gis/enseignement-superieur-custom", name: "enseignement_superieur_custom_point", label: "Enseignement superieur", icon: <img src={ensSupIcon} alt="Enseignement superieur" className="mr-2 w-5 h-5 inline" />, attrib: "Enseignement Superieur" },
      // Sante
      { url: "/gis/pharmacies", name: "pharmacies_point", label: "Pharmacies", icon: <img src={pharmacieIcon} alt="Pharmacies" className="mr-2 w-5 h-5 inline" />, attrib: "Pharmacies" },
      // Religion
      { url: "/gis/eglises-catholiques-font", name: "eglises_catholiques_font_point", label: "Eglises Catholiques", icon: <img src={eglCathIcon} alt="Eglises Catholiques" className="mr-2 w-5 h-5 inline" />, attrib: "Eglises catholiques" },
      { url: "/gis/eglises-presbyteriennes-font", name: "eglises_presbyteriennes_font_point", label: "Eglises Presbyteriennes", icon: <img src={eglCathIcon} alt="Eglises Presbyteriennes" className="mr-2 w-5 h-5 inline" />, attrib: "Eglises presbyteriennes" },
      { url: "/gis/eglises-protestantes", name: "eglises_protestantes_point", label: "Eglises Protestantes", icon: <img src={eglCathIcon} alt="Eglises Protestantes" className="mr-2 w-5 h-5 inline" />, attrib: "Eglises protestantes" },
      { url: "/gis/mosquees-font", name: "mosquees_font_point", label: "Mosquées", icon: <img src={mosqueeIcon} alt="Mosquées" className="mr-2 w-5 h-5 inline" />, attrib: "Mosquee" },
      // Services Publiques
      { url: "/gis/nations-unies", name: "nations_unies_point", label: "Nations Unies", icon: <img src={nationsUniesIcon} alt="Nations Unies" className="mr-2 w-5 h-5 inline" />, attrib: "Nations unies" },
      { url: "/gis/banques-et-microfinances-custom", name: "banques_et_microfinances_custom_point", label: "Banques et microfinances", icon: <img src={banquesIcon} alt="Banques et microfinances" className="mr-2 w-5 h-5 inline" />, attrib: "Banques et Microfinances" },
      { url: "/gis/cites-municipales-cuy", name: "cites_municipales_cuy_point", label: "Cites Municipales", icon: <img src={citesMunicipalesIcon} alt="Cites Municipales" className="mr-2 w-5 h-5 inline" />, attrib: "Cites Municipales" },
      { url: "/gis/centre-special-detat-civil-font", name: "centre_special_detat_civil_font_point", label: "Centres special detat civil", icon: <img src={centreSpecialIcon} alt="Centres special detat civil" className="mr-2 w-5 h-5 inline" />, attrib: "Centre detat civil" },
      { url: "/gis/mairies-yaounde-custom", name: "mairies_yaounde_custom_point", label: "Mairies Yaounde", icon: <img src={mairieIcon} alt="Mairies Yaounde" className="mr-2 w-5 h-5 inline" />, attrib: "Mairies yaounde" },
      { url: "/gis/prefectures-sous-prefectures-custom", name: "prefectures_sous-prefectures_custom_point", label: "Prefectures/sous-prefectures", icon: <img src={prefAndSPrefIcon} alt="Prefectures/sous-prefectures" className="mr-2 w-5 h-5 inline" />, attrib: "Prefectures/Sous-prefectures" },
      { url: "/gis/ambassades", name: "ambassades_point", label: "Ambassades", icon: <img src={ambassadeIcon} alt="Ambassades" className="mr-2 w-5 h-5 inline" />, attrib: "Ambassades" },
      // Securite
      { url: "/gis/gendarmeries", name: "gendarmeries_point", label: "Gendarmeries", icon: <img src={gendarmerieIcon} alt="Gendarmeries" className="mr-2 w-5 h-5 inline" />, attrib: "Gendarmeries" },
      { url: "/gis/commissariats-yde-font", name: "commissariats_yde_font_point", label: "Commissariats", icon: <img src={commissariatIcon} alt="Commissariats" className="mr-2 w-5 h-5 inline" />, attrib: "Commissariats" },
      // Autres
      { url: "/gis/restaurants-yaounde-font", name: "restaurants_yaounde_font_point", label: "Restaurants", icon: <img src={restaurantIcon} alt="Restaurants" className="mr-2 w-5 h-5 inline" />, attrib: "Restaurants" },
      { url: "/gis/boulangeries-custom", name: "boulangeries_custom_point", label: "Boulangeries", icon: <img src={boulangerieIcon} alt="Boulangeries" className="mr-2 w-5 h-5 inline" />, attrib: "Boulangeries" },
      { url: "/gis/centres-culturels-custom", name: "centres_culturels_custom_point", label: "Centres Culturels", icon: <img src={centreCulturelIcon} alt="Centres Culturels" className="mr-2 w-5 h-5 inline" />, attrib: "Centres Culturels" },
      { url: "/gis/hotels-font", name: "hotels_font_point", label: "Hotels", icon: <img src={hotelsIcon} alt="Hotels" className="mr-2 w-5 h-5 inline" />, attrib: "Hotels" },
      { url: "/gis/monuments", name: "monuments_custom_point", label: "Monuments", icon: <img src={monumentIcon} alt="Monuments" className="mr-2 w-5 h-5 inline" />, attrib: "Monuments" },
      { url: "/gis/lieux-remarquables", name: "lieux_remarquables_point", label: "Lieux remarquables", icon: <img src={lieuxRemIcon} alt="Lieux remarquables" className="mr-2 w-5 h-5 inline" />, attrib: "Lieux remarquables" },
      { url: "/gis/auberges-custom", name: "auberges_custom_point", label: "Auberges", icon: <img src={aubergesIcon} alt="Auberges" className="mr-2 w-5 h-5 inline" />, attrib: "Auberges custom" },
      { url: "/gis/bouches-incendies-yde-custom", name: "bouches_incendies_yde_custom_point", label: "Bouches incendies", icon: <img src={bouchesIncendiesIcon} alt="Bouches incendies" className="mr-2 w-5 h-5 inline" />, attrib: "Bouches incendies" },
      { url: "/gis/garages-custom", name: "garages_custom_point", label: "Garages", icon: <img src={garageIcon} alt="Garages" className="mr-2 w-5 h-5 inline" />, attrib: "Garages" },
      { url: "/gis/complexes-sportifs-custom", name: "complexes_sportifs_custom_point", label: "Complexes Sportifs", icon: <img src={sportIcon} alt="Complexes Sportifs" className="mr-2 w-5 h-5 inline" />, attrib: "Complexes Sportifs" },
      { url: "/gis/sapeurs-pompier", name: "sapeurs_pompier_point", label: "Sapeur pompier", icon: <img src={sapeurPompierIcon} alt="Sapeur pompier" className="mr-2 w-5 h-5 inline" />, attrib: "Sapeurs pompiers" },
      { url: "/gis/laveries-font", name: "laveries_font_point", label: "Laveries", icon: <img src={laverieIcon} alt="Laveries" className="mr-2 w-5 h-5 inline" />, attrib: "Laveries" },
      { url: "/gis/stations-sevices-font", name: "stations_sevices_font_point", label: "Stations Services", icon: <img src={stationServiceIcon} alt="Stations Services" className="mr-2 w-5 h-5 inline" />, attrib: "Stations Services" },
      { url: "/gis/agences-de-voyages-font", name: "agences_de_voyages_font_point", label: "Agences de Voyages", icon: <img src={agenceDeVoyageIcon} alt="Agences de Voyages" className="mr-2 w-5 h-5 inline" />, attrib: "Agences de voyages" },
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
    const categories = [
      { title: "Education", filter: l => ["enseignement_de_base_font_point","ecoles_mat_primaire_point","enseignements_secondaires_final_point","enseignement_superieur_custom_point"].includes(l.name) },
      { title: "Sante", filter: l => ["pharmacies_point"].includes(l.name) },
      { title: "Religion", filter: l => ["eglises_catholiques_font_point","eglises_presbyteriennes_font_point","eglises_protestantes_point","mosquees_font_point"].includes(l.name) },
      { title: "Services Publiques", filter: l => ["nations_unies_point","banques_et_microfinances_custom_point","cites_municipales_cuy_point","centre_special_detat_civil_font_point","mairies_yaounde_custom_point","prefectures_sous-prefectures_custom_point","ambassades_point"].includes(l.name) },
      { title: "Securite", filter: l => ["gendarmeries_point","commissariats_yde_font_point"].includes(l.name) },
      { title: "Autres", filter: l => ["restaurants_yaounde_font_point","boulangeries_custom_point","centres_culturels_custom_point","hotels_font_point","monuments_custom_point","lieux_remarquables_point","auberges_custom_point","bouches_incendies_yde_custom_point","garages_custom_point","complexes_sportifs_custom_point","sapeurs_pompier_point","laveries_font_point","stations_sevices_font_point","agences_de_voyages_font_point"].includes(l.name) },
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
                                {isChecked && <FaCheck className="text-green-600 text-base" />}
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