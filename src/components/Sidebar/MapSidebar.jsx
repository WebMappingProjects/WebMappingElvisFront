/*eslint-disable*/
import { Link } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useState, useEffect } from "react";
import { FaBars, FaBreadSlice, FaBuilding, FaCar, FaChargingStation, FaCreditCard, FaCross, FaHamburger, FaHotel, FaMoneyBill, FaMosque, FaPersonBooth, FaPiggyBank, FaPlus, FaRunning, FaSchool, FaServicestack, FaTimes, FaTruck, FaUniversity, FaUser, FaUserAlt, FaUserCog, FaUserGraduate, FaUserInjured } from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";

export default function MapSidebar() {
    const { selectedLayers, setSelectedLayers } = useAppMainContext();
    const [collapseShow, setCollapseShow] = useState("hidden");

    // Définition de toutes les couches disponibles (nom, label, icône, attribution)
    const allLayers = [
      // Education
      { name: "enseignement_de_base_font_point", label: "Enseignement de base", icon: <FaSchool className="mr-2 text-sm"/>, attrib: "Enseignement de base" },
      { name: "ecoles_mat_primaire_point", label: "Ecoles maternelles et primaires", icon: <FaSchool className="mr-2 text-sm"/>, attrib: "Ecoles Maternelles et Primaires" },
      { name: "enseignements_secondaires_final_point", label: "Enseignement Secondaire", icon: <FaSchool className="mr-2 text-sm"/>, attrib: "Enseignement Secondaire" },
      { name: "enseignement_superieur_custom_point", label: "Enseignement superieur", icon: <FaUniversity className="mr-2 text-sm"/>, attrib: "Enseignement Superieur" },
      // Sante
      { name: "pharmacies_point", label: "Pharmacies", icon: <FaPlus className="mr-2 text-sm"/>, attrib: "Pharmacies" },
      // Religion
      { name: "eglises_catholiques_font_point", label: "Eglises Catholiques", icon: <FaCross className="mr-2 text-sm"/>, attrib: "Eglises catholiques" },
      { name: "eglises_presbyteriennes_font_point", label: "Eglises Presbyteriennes", icon: <FaCross className="mr-2 text-sm"/>, attrib: "Eglises presbyteriennes" },
      { name: "eglises_protestantes_point", label: "Eglises Protestantes", icon: <FaCross className="mr-2 text-sm"/>, attrib: "Eglises protestantes" },
      { name: "mosquees_font_point", label: "Mosquées", icon: <FaMosque className="mr-2 text-sm"/>, attrib: "Mosquee" },
      // Services Publiques
      { name: "nations_unies_point", label: "Nations Unies", icon: <FaServicestack className="mr-2 text-sm"/>, attrib: "Nations unies" },
      { name: "banques_et_microfinances_custom_point", label: "Banques et microfinances", icon: <FaMoneyBill className="mr-2 text-sm"/>, attrib: "Banques et Microfinances" },
      { name: "cites_municipales_cuy_point", label: "Cites Municipales", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Cites Municipales" },
      { name: "centre_special_detat_civil_font_point", label: "Centres special detat civil", icon: <FaTruck className="mr-2 text-sm"/>, attrib: "Centre detat civil" },
      { name: "mairies_yaounde_custom_point", label: "Mairies Yaounde", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Mairies yaounde" },
      { name: "prefectures_sous-prefectures_custom_point", label: "Prefectures/sous-prefectures", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Prefectures/Sous-prefectures" },
      { name: "ambassades_point", label: "Ambassades", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Ambassades" },
      // Securite
      { name: "gendarmeries_point", label: "Gendarmeries", icon: <FaUser className="mr-2 text-sm"/>, attrib: "Gendarmeries" },
      { name: "commissariats_yde_font_point", label: "Commissariats", icon: <FaUser className="mr-2 text-sm"/>, attrib: "Commissariats" },
      // Autres
      { name: "restaurants_yaounde_font_point", label: "Restaurants", icon: <FaHamburger className="mr-2 text-sm"/>, attrib: "Restaurants" },
      { name: "boulangeries_custom_point", label: "Boulangeries", icon: <FaBreadSlice className="mr-2 text-sm"/>, attrib: "Boulangeries" },
      { name: "centres_culturels_custom_point", label: "Centres Culturels", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Centres Culturels" },
      { name: "hotels_font_point", label: "Hotels", icon: <FaHotel className="mr-2 text-sm"/>, attrib: "Hotels" },
      { name: "monuments_custom_point", label: "Monuments", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Monuments" },
      { name: "lieux_remarquables_point", label: "Lieux remarquables", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Lieux remarquables" },
      { name: "auberges_custom_point", label: "Auberges", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Auberges custom" },
      { name: "bouches_incendies_yde_custom_point", label: "Bouches incendies", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Bouches incendies" },
      { name: "garages_custom_point", label: "Garages", icon: <FaBuilding className="mr-2 text-sm"/>, attrib: "Garages" },
      { name: "complexes_sportifs_custom_point", label: "Complexes Sportifs", icon: <FaRunning className="mr-2 text-sm"/>, attrib: "Complexes Sportifs" },
      { name: "sapeurs_pompier_point", label: "Sapeur pompier", icon: <FaTruck className="mr-2 text-sm"/>, attrib: "Sapeurs pompiers" },
      { name: "laveries_font_point", label: "Laveries", icon: <FaCar className="mr-2 text-sm"/>, attrib: "Laveries" },
      { name: "stations_sevices_font_point", label: "Stations Services", icon: <FaChargingStation className="mr-2 text-sm"/>, attrib: "Stations Services" },
      { name: "agences_de_voyages_font_point", label: "Agences de Voyages", icon: <FaTruck className="mr-2 text-sm"/>, attrib: "Agences de voyages" },
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
                      {allLayers.filter(cat.filter).map(layer => (
                        <li className="items-center" key={layer.name}>
                          <label className="flex flex-row items-center py-3 pl-2 text-xs font-bold uppercase rounded cursor-pointer text-primary-dark hover:text-white hover:bg-primary-dark">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={!!selectedLayers.find(l => l.name === layer.name)}
                              onChange={() => handleCheckboxChange(layer)}
                            />
                            {layer.icon}
                            {layer.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </>
      );
}