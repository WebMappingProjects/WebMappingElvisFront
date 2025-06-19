import { useEffect, useState, useMemo } from "react";
import axios from "../api/axios";
import { useAppMainContext } from "../context/AppProvider";
import PieChart from "../components/PieChart";
import PolygonChart from "../components/PolygonChart";

// Liste des services dynamiquement récupérée depuis la sidebar
const allLayers = [
  { name: "enseignement_de_base_font_point", label: "Enseignement de base", dtName: "Écoles de base" },
  { name: "ecoles_mat_primaire_point", label: "Ecoles maternelles et primaires", dtName: "Écoles primaires" },
  { name: "enseignements_secondaires_final_point", label: "Enseignement Secondaire", dtName: "Enseignement secondaire" },
  { name: "enseignement_superieur_custom_point", label: "Enseignement superieur", dtName: "Enseignement supérieur" },
  { name: "pharmacies_point", label: "Pharmacies", dtName: "Pharmacies" },
  { name: "eglises_catholiques_font_point", label: "Eglises Catholiques", dtName: "Églises catholiques" },
  { name: "eglises_presbyteriennes_font_point", label: "Eglises Presbyteriennes", dtName: "Églises presbytériennes" },
  { name: "eglises_protestantes_point", label: "Eglises Protestantes", dtName: "Églises protestantes" },
  { name: "mosquees_font_point", label: "Mosquées", dtName: "Mosquées" },
  { name: "nations_unies_point", label: "Nations Unies", dtName: "Nations Unies" },
  { name: "banques_et_microfinances_custom_point", label: "Banques et microfinances", dtName: "Banques et microfinances" },
  { name: "cites_municipales_cuy_point", label: "Cites Municipales", dtName: "Cités municipales" },
  { name: "centre_special_detat_civil_font_point", label: "Centres special detat civil", dtName: "Centre spécial état civil" },
  { name: "mairies_yaounde_custom_point", label: "Mairies Yaounde", dtName: "Mairies" },
  { name: "prefectures_sous-prefectures_custom_point", label: "Prefectures/sous-prefectures", dtName: "Préfectures et sous-préfectures" },
  { name: "ambassades_point", label: "Ambassades", dtName: "Ambassades" },
  { name: "gendarmeries_point", label: "Gendarmeries", dtName: "Gendarmeries" },
  { name: "commissariats_yde_font_point", label: "Commissariats", dtName: "Commissariats" },
  { name: "restaurants_yaounde_font_point", label: "Restaurants", dtName: "Restaurants" },
  { name: "boulangeries_custom_point", label: "Boulangeries", dtName: "Boulangeries" },
  { name: "centres_culturels_custom_point", label: "Centres Culturels", dtName: "Centres culturels" },
  { name: "hotels_font_point", label: "Hotels", dtName: "Hôtels" },
  { name: "monuments_custom_point", label: "Monuments", dtName: "" },
  { name: "lieux_remarquables_point", label: "Lieux remarquables", dtName: "Lieux remarquables" },
  { name: "auberges_custom_point", label: "Auberges", dtName: "Auberges" },
  { name: "bouches_incendies_yde_custom_point", label: "Bouches incendies", dtName: "Bouches incendie" },
  { name: "garages_custom_point", label: "Garages", dtName: "Garages" },
  { name: "complexes_sportifs_custom_point", label: "Complexes Sportifs", dtName: "Complexes sportifs" },
  { name: "sapeurs_pompier_point", label: "Sapeur pompier", dtName: "Sapeurs-pompiers" },
  { name: "laveries_font_point", label: "Laveries", dtName: "Laveries" },
  { name: "stations_sevices_font_point", label: "Stations Services", dtName: "Stations service" },
  { name: "agences_de_voyages_font_point", label: "Agences de Voyages", dtName: "Agences de voyage" },
];

// Colonnes groupables par service (à adapter selon le backend)
const groupableColumns = {
  enseignement_de_base_font_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  ecoles_mat_primaire_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  enseignements_secondaires_final_point: [
    { name: "fondateur", data: "fondateur" },
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  enseignement_superieur_custom_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  pharmacies_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  eglises_catholiques_font_point: [
    { name: "quartier", data: "quartier" }
  ],
  eglises_presbyteriennes_font_point: [
    { name: "quartier", data: "quartier" }
  ],
  eglises_protestantes_point: [
    { name: "quartier", data: "quartier" }
  ],
  mosquees_font_point: [
    { name: "quartier", data: "quartier" }
  ],
  nations_unies_point: [
    { name: "quartier", data: "quartier" }
  ],
  banques_et_microfinances_custom_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
    { name: "type", data: "type" },
  ],
  cites_municipales_cuy_point: [
    { name: "quartier", data: "quartier" }
  ],
  centre_special_detat_civil_font_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  mairies_yaounde_custom_point: [
    { name: "quartier", data: "quartier" }
  ],
  prefectures_sous_prefectures_custom_point: [
    { name: "quartier", data: "quartier" }
  ],
  ambassades_point: [
    { name: "quartier", data: "quartier" }
  ],
  gendarmeries_point: [
    { name: "localisation", data: "localisati" },
    { name: "specialisation", data: "sp_cialisa" },
  ],
  commissariats_yde_font_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  restaurants_yaounde_font_point: [
    { name: "quartier", data: "quartier" },
    { name: "commune", data: "commune" },
    { name: "standing", data: "standing" },
  ],
  boulangeries_custom_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
    { name: "standing", data: "standing" },
    { name: "proprietaire", data: "propri_tai" },
  ],
  centres_culturels_custom_point: [
    { name: "quartier", data: "quartier" },
    { name: "promoteur", data: "promoteur" },
    { name: "commune", data: "commune" },
  ],
  hotels_font_point: [
    { name: "quartier", data: "quartier" },
    { name: "commune", data: "commune" },
    { name: "standing", data: "standing" },
  ],
  monuments_custom_point: [ ],
  lieux_remarquables_point: [ ],
  auberges_custom_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  bouches_incendies_yde_custom_point: [ ],
  garages_custom_point: [
    { name: "quartier", data: "quartier" },
    { name: "standing", data: "standing" },
  ],
  complexes_sportifs_custom_point: [
    { name: "type", data: "type" },
    { name: "quartier", data: "quartier" },
    { name: "discipline", data: "discipline" },
    { name: "commune", data: "commune" },
    { name: "standing", data: "standing" },
  ],
  sapeurs_pompier_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  laveries_font_point: [
    { name: "adresse", data: "adresse" },
    { name: "quartier", data: "quartier" },
    { name: "standing", data: "standing" },
  ],
  stations_sevices_font_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
  agences_de_voyages_font_point: [
    { name: "quartier", data: "quartier" },
    { name: "arrondissement", data: "arrondisse" },
  ],
};

const StatsDashboard = () => {
  const { statsSelectedLayers } = useAppMainContext();
  // Service sélectionné : le premier de la sélection ou le premier de la liste
  //const selectedService = statsSelectedLayers[0]?.name || allLayers[0].name;
  const [ selectedService, setSelectedService ] = useState(null);
  //const [selectedColumn, setSelectedColumn] = useState(groupableColumns[selectedService][0]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [counts, setCounts] = useState({});
  const [groupedData, setGroupedData] = useState([]);
  const [ distanceDatas, setDistanceDatas ] = useState(null);
  const [totalAllServices, setTotalAllServices] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const totalPages = Math.ceil(groupedData.length / rowsPerPage);
  const paginatedData = groupedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    // Récupère le nombre d'enregistrements pour chaque service
    if(statsSelectedLayers.length > 0)
    {
      let total = 0;
      statsSelectedLayers.forEach(async (service) => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`/gis/count/`, { 
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          const serviceCount = res.data.services[service.dtName];
          setCounts((prev) => ({ ...prev, [service.name]: serviceCount }));
          total += serviceCount;
          setTotalAllServices(total);
        } catch (e) {
          console.log("ERROR", e);
        }
      });
      if(selectedService == null || statsSelectedLayers.filter(l => l.name === selectedService?.name).length < 1)
      {
        setSelectedService(statsSelectedLayers[0]);
      }
    } else { setTotalAllServices(0); setDistanceDatas(null); setSelectedService(null); setGroupedData([]); }
  }, [statsSelectedLayers]);

  useEffect(() => {
    // Met à jour la colonne sélectionnée si le service change
    if(selectedService != null)
    {
      if(Array.isArray(groupableColumns[selectedService?.name]))
      {
        const gc = groupableColumns[selectedService?.name];
        setSelectedColumn(gc.length > 0 ? gc[0] : null);
      }
      else setSelectedColumn(null);
    }
  }, [selectedService]);

  const transformToUpperCamelCase = (str) => {
    return str.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
  }

  useEffect(() => {
    // Récupère les données groupées
    if (selectedService && selectedColumn) {
      let token = localStorage.getItem("token");
      const modelName = transformToUpperCamelCase(selectedService.name);
      axios
        .get(`/gis/group?model=${modelName}&group_by=${selectedColumn?.data}`, { headers : { "Authorization" : `Bearer ${token}` }})
      .then((res) => { setGroupedData(res.data.results) })
        .catch(() => setGroupedData([]));
    }
  }, [selectedService, selectedColumn]);

  useEffect(() => {
    // Récupère la distance moyenne
    if (selectedService) {
      let token = localStorage.getItem("token");
      const modelName = transformToUpperCamelCase(selectedService.name);
      axios
        .get(`/gis/distance?model=${modelName}`, { headers : { "Authorization" : `Bearer ${token}` } })
        .then((res) => { console.log("DISTANCE DATAS", res); setDistanceDatas(res.data); })
        .catch((error) => { setDistanceDatas(null)});
    }
  }, [selectedService]);

  // Reset page when groupedData changes
  useEffect(() => { setCurrentPage(1); }, [groupedData]);

  // Mémoïse les données du PieChart pour éviter les updates inutiles
  const pieChartData = useMemo(() => statsSelectedLayers.map((service) => counts[service.name] ?? 0), [statsSelectedLayers, counts]);
  const pieChartLabels = useMemo(() => statsSelectedLayers.map((service) => service.label), [statsSelectedLayers]);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Statistiques globales</h2>
      {/* Diagramme circulaire + polygonal */}
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        <PieChart
          data={pieChartData}
          labels={pieChartLabels}
          colors={[
            "#4F46E5", "#F59E42", "#10B981", "#EF4444", "#6366F1", "#FBBF24", "#3B82F6", "#F472B6",
            "#22D3EE", "#A78BFA", "#F87171", "#34D399", "#FDE68A", "#60A5FA", "#F472B6", "#F9A8D4",
            "#FCD34D", "#6EE7B7", "#818CF8", "#FCA5A5", "#A7F3D0", "#FBCFE8", "#FDE68A", "#C7D2FE",
            "#FECACA", "#F3F4F6", "#D1FAE5", "#F1F5F9", "#F9FAFB", "#E0E7FF", "#F3E8FF", "#FDE68A"
          ]}
        />
        <PolygonChart
          data={pieChartData}
          labels={pieChartLabels}
          colors={["rgba(79,70,229,0.2)", "#4F46E5", "#4F46E5"]}
        />
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        {statsSelectedLayers.length > 0 ? statsSelectedLayers.map((service) => (
          <div key={service.name} className="bg-white rounded shadow p-4 min-w-[250px]">
            <div className="font-semibold text-gray-700">{service.label}</div>
            <div className="text-3xl text-right text-primary-dark">{counts[service.name] ?? "..."}</div>
          </div>
        )) : null }

        <div className="bg-primary-default text-white rounded shadow p-4 min-w-[250px]">
          <div className="font-semibold">Total</div>
          <div className="text-3xl text-right">{totalAllServices}</div>
        </div>
      </div>
      <h3 className="mb-2 text-xl font-semibold">Regroupement par colonne</h3>
      <p className="mb-4">Activez un service a votre</p>
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={selectedService?.name}
          onChange={e => {
            console.log("SELECTION CHANGED", groupableColumns[e.target.value][0]);
            setSelectedColumn(groupableColumns[e.target.value][0]);

            const filteredService = statsSelectedLayers.filter(l => l.name.toLowerCase() == e.target.value.toLowerCase());
            if(filteredService.length > 0) setSelectedService(filteredService[0]);
          }}
          className="p-2 border rounded min-w-[200px]"
        >
          {statsSelectedLayers?.map((service) => (
            <option key={service.name} value={service.name}>
              {service.label}
            </option>
          ))}
        </select>
        <select
          value={selectedColumn?.name}
          onChange={e => {
            let filtered = groupableColumns[selectedService?.name].filter(l => l.name.toLowerCase() === e.target.value.toLowerCase());
            setSelectedColumn(filtered.length > 0 ? filtered[0] : null);
          }}
          className="p-2 border rounded min-w-[200px]"
        >
          {selectedService != null ? groupableColumns[selectedService.name]?.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          )) : null }
        </select>
      </div>
      <table className="min-w-full mb-8 bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 text-left">{selectedColumn?.name}</th>
            <th className="p-2 text-left">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {groupedData.length === 0 ? (
            <tr>
              <td colSpan={2} className="p-2 text-center text-gray-400">
                Aucune donnée
              </td>
            </tr>
          ) : (
            paginatedData?.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2">{row[selectedColumn.data]}</td>
                <td className="p-2">{row.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination controls */}
      {groupedData.length > rowsPerPage && (
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span>
            Page {currentPage} / {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
      <h3 className="mb-2 text-xl font-semibold">Statistiques de distance</h3>
      <p className="mb-4">Activez un service a votre </p>
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={selectedService?.name}
          onChange={e => {
            console.log("SELECTION CHANGED", groupableColumns[e.target.value][0]);
            setSelectedColumn(groupableColumns[e.target.value][0]);

            const filteredService = statsSelectedLayers.filter(l => l.name.toLowerCase() == e.target.value.toLowerCase());
            if(filteredService.length > 0) setSelectedService(filteredService[0]);
          }}
          className="p-2 border rounded min-w-[200px]"
        >
          {statsSelectedLayers?.map((service) => (
            <option key={service.name} value={service.name}>
              {service.label}
            </option>
          ))}
        </select>
      </div>  
            {/* 'distance_moyenne_metres': round(avg_distance, 2),
      'distance_minimale_metres': round(min_distance, 2),
      'distance_maximale_metres': round(max_distance, 2),
      'distance_mediane_metres': round(median_distance, 2),
      'message': f'En moyenne, il faut parcourir {round(avg_distance, 2)} mètres pour trouver un autre {model_name}' */}
      <div className="bg-white rounded shadow p-4 min-w-[200px] my-3 text-primary-default">
        <div>
          <div className="text-lg font-semibold">Distance moyenne (en metres)</div>
          <div className="text-xl font-bold text-right text-primary-dark-op">
            {distanceDatas === null ? "..." : `${distanceDatas.distance_moyenne_metres} m`}
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 min-w-[200px] my-3 text-primary-default">
        <div>
          <div className="text-lg font-semibold">Distance minimale (en metres)</div>
          <div className="text-xl font-bold text-right text-primary-dark-op">
            {distanceDatas === null ? "..." : `${distanceDatas.distance_minimale_metres} m`}
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 min-w-[200px] my-3 text-primary-default">
        <div>
          <div className="text-lg font-semibold">Distance maximale (en metres)</div>
          <div className="text-xl font-bold text-right text-primary-dark-op">
            {distanceDatas === null ? "..." : `${distanceDatas.distance_maximale_metres} m`}
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 min-w-[200px] my-3 text-primary-default">
        <div>
          <div className="text-lg font-semibold">Distance mediane (en metres)</div>
          <div className="text-xl font-bold text-right text-primary-dark-op">
            {distanceDatas === null ? "..." : `${distanceDatas.distance_mediane_metres} m`}
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 min-w-[200px] my-3 text-primary-default">
        <div>
          <div className="text-lg font-semibold">Nombre de points analyses</div>
          <div className="text-xl font-bold text-right text-primary-dark-op">
            {distanceDatas === null ? "..." : `${distanceDatas.nombre_points_analysés}`}
          </div>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 min-w-[200px] my-3 text-primary-default">
        <div>
          <div className="text-lg font-semibold">Nombre de paires</div>
          <div className="text-xl font-bold text-right text-primary-dark-op">
            {distanceDatas === null ? "..." : `${distanceDatas.nombre_paires}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
