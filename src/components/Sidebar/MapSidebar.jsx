/*eslint-disable*/
import { Link } from "react-router-dom";

import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUser, FaCheck, FaBuilding, FaUniversity, FaMap, FaWater, FaRoad, FaLayerGroup, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from "react-icons/fa";
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
    const [expandedCategories, setExpandedCategories] = useState({ services: true, autres: true });

    // Définition de toutes les couches disponibles (nom, label, icône, attribution)
    const allLayers = [
      { url: "/gis/centres-sante", name: "centre_sante", label: "Centre de santé", icon: <img src={pharmacieIcon} alt="Centre de sante" className="inline w-6 h-6 mr-3" />, attrib: "Centre de sante" },
      { url: "/gis/eglises", name: "eglises", label: "Églises", icon: <img src={eglCathIcon} alt="Eglises" className="inline w-6 h-6 mr-3" />, attrib: "Eglises" },
      { url: "/gis/enseignement", name: "enseignement", label: "Enseignement", icon: <img src={ensSecIcon} alt="Enseignement" className="inline w-6 h-6 mr-3" />, attrib: "Enseignement" },
      { url: "/gis/hebergements", name: "hebergements", label: "Hébergements", icon: <img src={hotelsIcon} alt="Hebergement" className="inline w-6 h-6 mr-3" />, attrib: "Hebergement" },
      { url: "/gis/securite", name: "securite", label: "Sécurité", icon: <img src={commissariatIcon} alt="Securite" className="inline w-6 h-6 mr-3" />, attrib: "Securite" },
      { url: "/gis/services-publiques", name: "services_publiques", label: "Services publics", icon: <img src={stationServiceIcon} alt="Service Publique" className="inline w-6 h-6 mr-3" />, attrib: "Service Publique" },
      
      { url: "/gis/communes", name: "communes", label: "Communes", icon: <FaBuilding className="mr-3 text-lg text-blue-400" />, attrib: "Communes" },
      { url: "/gis/departements", name: "departements", label: "Départements", icon: <FaUniversity className="mr-3 text-lg text-purple-400" />, attrib: "Departements" },
      { url: "/gis/regions", name: "regions", label: "Régions", icon: <FaMap className="mr-3 text-lg text-green-400" />, attrib: "Regions" },
      { url: "/gis/hydrographie", name: "hydrographie", label: "Hydrographie", icon: <FaWater className="mr-3 text-lg text-cyan-400" />, attrib: "Hydrographie" },
      { url: "/gis/routes", name: "routes", label: "Routes", icon: <FaRoad className="mr-3 text-lg text-orange-400" />, attrib: "Routes" },
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

    const toggleCategory = (category) => {
      setExpandedCategories(prev => ({
        ...prev,
        [category]: !prev[category]
      }));
    };

    const toggleAllInCategory = (categoryLayers) => {
      const allSelected = categoryLayers.every(layer => 
        selectedLayers.find(l => l.name === layer.name)
      );
      
      if (allSelected) {
        // Désélectionner toutes les couches de cette catégorie
        setSelectedLayers(selectedLayers.filter(l => 
          !categoryLayers.find(cl => cl.name === l.name)
        ));
      } else {
        // Sélectionner toutes les couches de cette catégorie
        const newLayers = categoryLayers.filter(layer => 
          !selectedLayers.find(l => l.name === layer.name)
        );
        setSelectedLayers([...selectedLayers, ...newLayers]);
      }
    };

    const categories = [
      { 
        title: "Services", 
        key: "services",
        color: "text-blue-300",
        filter: l => [
          "centre_sante",
          "eglises",
          "enseignement",
          "hebergements",
          "securite",
          "services_publiques"
        ].includes(l.name) 
      },
      { 
        title: "Territoires & Infrastructure", 
        key: "autres",
        color: "text-green-300",
        filter: l => [
          "communes",
          "departements",
          "regions",
          "hydrographie",
          "routes"
        ].includes(l.name) 
      },
    ];

    return (
        <>
          <nav className="relative z-[1001] flex flex-wrap items-center justify-between px-0 py-0 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-80">
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
                🗺️ Couches Carte
              </Link>

              {/* Catégories dynamiques */}
              <div className={
                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }>
                {/* Collapse header */}
                <div className="block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-slate-600">
                  <div className="flex flex-wrap">
                    <div className="w-6/12">
                      <Link
                        className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-white uppercase md:block md:pb-2 whitespace-nowrap"
                        to="/"
                      >
                        Couches
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

                {/* Stats des couches sélectionnées */}
                <div className="px-6 mb-6">
                  <div className="p-4 rounded-lg bg-slate-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">Couches actives</span>
                      <span className="px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-full">
                        {selectedLayers.length}
                      </span>
                    </div>
                  </div>
                </div>
                
                {categories.map(cat => {
                  const categoryLayers = allLayers.filter(cat.filter);
                  const selectedInCategory = categoryLayers.filter(layer => 
                    selectedLayers.find(l => l.name === layer.name)
                  ).length;
                  
                  return (
                    <div key={cat.title} className="px-6 mb-6">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-600">
                        <button
                          onClick={() => toggleCategory(cat.key)}
                          className="flex items-center flex-1 text-left"
                        >
                          <h6 className={`flex items-center text-sm font-semibold ${cat.color} uppercase tracking-wide`}>
                            <FaLayerGroup className="mr-2 text-sm" />
                            {cat.title}
                          </h6>
                          <span className="px-2 py-1 ml-2 text-xs rounded-full bg-slate-600 text-slate-300">
                            {selectedInCategory}/{categoryLayers.length}
                          </span>
                        </button>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleAllInCategory(categoryLayers)}
                            className="p-1 text-xs transition-colors text-slate-400 hover:text-white"
                            title="Tout sélectionner/désélectionner"
                          >
                            {selectedInCategory === categoryLayers.length ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <button
                            onClick={() => toggleCategory(cat.key)}
                            className="text-xs transition-colors text-slate-400 hover:text-white"
                          >
                            {expandedCategories[cat.key] ? <FaChevronUp /> : <FaChevronDown />}
                          </button>
                        </div>
                      </div>
                      
                      {expandedCategories[cat.key] && (
                        <ul className="space-y-2">
                          {categoryLayers.map(layer => {
                            const isChecked = !!selectedLayers.find(l => l.name === layer.name);
                            return (
                              <li key={layer.name}>
                                <label className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  isChecked 
                                    ? 'bg-blue-500/20 border border-blue-500/50' 
                                    : 'bg-slate-700/50 hover:bg-slate-600/50'
                                }`}>
                                  <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(layer)}
                                  />
                                  <div className={`flex items-center justify-center w-5 h-5 mr-3 rounded border-2 transition-colors ${
                                    isChecked 
                                      ? 'bg-blue-500 border-blue-500' 
                                      : 'border-slate-400 hover:border-blue-400'
                                  }`}>
                                    {isChecked && <FaCheck className="text-xs text-white" />}
                                  </div>
                                  <div className="flex items-center">
                                    {layer.icon}
                                    <span className={`text-sm font-medium ${
                                      isChecked ? 'text-white' : 'text-slate-300'
                                    }`}>
                                      {layer.label}
                                    </span>
                                  </div>
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}

                {/* Actions rapides */}
                <div className="px-6 mb-6">
                  <div className="p-4 rounded-lg bg-slate-700">
                    <h6 className="mb-3 text-sm font-semibold text-slate-300">Actions rapides</h6>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => setSelectedLayers(allLayers)}
                        className="px-3 py-2 text-sm text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Tout sélectionner
                      </button>
                      <button
                        onClick={() => setSelectedLayers([])}
                        className="px-3 py-2 text-sm text-white transition-colors rounded bg-slate-600 hover:bg-slate-500"
                      >
                        Tout désélectionner
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex-grow"></div>
                <div className="px-6 py-4 mt-auto border-t border-slate-600">
                  <p className="text-xs text-center text-slate-400">
                    © 2024 Système d'Information Géographique
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </>
      );
}