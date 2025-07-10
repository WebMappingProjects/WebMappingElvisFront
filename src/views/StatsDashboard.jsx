import { useEffect, useState, useMemo } from "react";
import axios from "../api/axios";
import { useAppMainContext } from "../context/AppProvider";
import PieChart from "../components/PieChart";
import PolygonChart from "../components/PolygonChart";
import { getCorrectId } from "../utils/tools";

const StatsDashboard = () => {
  const { statsSelectedLayers } = useAppMainContext();
  const [selectedService, setSelectedService] = useState(null);
  const [counts, setCounts] = useState({});
  const [groupedData, setGroupedData] = useState([]);
  const [distanceDatas, setDistanceDatas] = useState(null);
  const [totalAllServices, setTotalAllServices] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminLevel, setAdminLevel] = useState("commune");
  const [totalGroupedCount, setTotalGroupedCount] = useState(0);
  
  const rowsPerPage = 20;
  const totalPages = Math.ceil(groupedData.length / rowsPerPage);
  const paginatedData = groupedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Fonction pour obtenir le nom de la colonne selon le niveau administratif
  const getColumnName = (adminLevel) => {
    switch (adminLevel) {
      case "commune":
        return "commune__nom";
      case "departement":
        return "commune__departement__nom";
      case "region":
        return "commune__departement__region__nom";
      default:
        return "commune__nom";
    }
  };

  useEffect(() => {
    // Récupère le nombre d'enregistrements pour chaque service
    if (statsSelectedLayers.length > 0) {
      let total = 0;
      statsSelectedLayers.forEach(async (service) => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`/gis/dashboard/global_statistics`, { 
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          const serviceCount = getCorrectId(res.data[`${service.dtName}_count`], res.data.services_count[service.dtName]);
          setCounts((prev) => ({ ...prev, [service.name]: serviceCount }));
          total += serviceCount;
          setTotalAllServices(total);
        } catch (e) {
          console.log("ERROR", e);
        }
      });
      
      if (selectedService == null || statsSelectedLayers.filter(l => l.name === selectedService?.name).length < 1) {
        setSelectedService(statsSelectedLayers[0]);
      }
    } else { 
      setTotalAllServices(0); 
      setDistanceDatas(null); 
      setSelectedService(null); 
      setGroupedData([]);
    }
  }, [statsSelectedLayers]);

  useEffect(() => {
    // Récupère les données groupées
    if (selectedService) {
      const token = localStorage.getItem("token");
      console.log("SELECTED SERVICE", selectedService);
      
      axios
        .get(`/gis/dashboard/group_by_admin?model=${selectedService.model}&admin_level=${adminLevel}`, { 
          headers: { "Authorization": `Bearer ${token}` }
        })
        .then((res) => { 
          console.log("RES", res); 
          setGroupedData(res.data.results);
          setTotalGroupedCount(res.data.total);
        })
        .catch((err) => { 
          console.error("ERROR", err); 
          setGroupedData([]);
          setTotalGroupedCount(0);
        });
    }
  }, [selectedService, adminLevel]);

  useEffect(() => {
    // Récupère les statistiques de distance
    if (selectedService) {
      const token = localStorage.getItem("token");
      
      axios
        .get(`/gis/dashboard/distance_stats?model=${selectedService.model}&admin_level=${adminLevel}`, { 
          headers: { "Authorization": `Bearer ${token}` } 
        })
        .then((res) => { 
          console.log("DISTANCE DATAS", res); 
          setDistanceDatas(res.data); 
        })
        .catch((error) => { 
          console.error("Distance error:", error);
          setDistanceDatas(null);
        });
    }
  }, [selectedService, adminLevel]);

  // Reset page when groupedData changes
  useEffect(() => { 
    setCurrentPage(1); 
  }, [groupedData]);

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
      
      {/* Cartes de statistiques */}
      <div className="flex flex-wrap gap-4 mb-8">
        {statsSelectedLayers.length > 0 ? statsSelectedLayers.map((service) => (
          <div key={service.name} className="bg-white rounded shadow p-4 min-w-[250px]">
            <div className="font-semibold text-gray-700">{service.label}</div>
            <div className="text-3xl text-right text-primary-dark">{counts[service.name] ?? "..."}</div>
          </div>
        )) : null}

        <div className="bg-primary-default text-white rounded shadow p-4 min-w-[250px]">
          <div className="font-semibold">Total</div>
          <div className="text-3xl text-right">{totalAllServices}</div>
        </div>
      </div>
      
      {/* Section de regroupement par niveau administratif */}
      <h3 className="mb-2 text-xl font-semibold">Regroupement par niveau administratif</h3>
      <p className="mb-4">Sélectionnez un service et un niveau administratif pour voir les statistiques</p>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={selectedService?.name || ""}
          onChange={e => {
            const filteredService = statsSelectedLayers.filter(l => l.name.toLowerCase() === e.target.value.toLowerCase());
            if (filteredService.length > 0) setSelectedService(filteredService[0]);
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
          value={adminLevel}
          onChange={(e) => setAdminLevel(e.target.value)}
          className="p-2 border rounded min-w-[200px]"
        >
          <option value="commune">COMMUNE</option>
          <option value="departement">DEPARTEMENT</option>
          <option value="region">REGION</option>
        </select>
      </div>
      
      {/* Affichage du total pour le niveau sélectionné */}
      {selectedService && (
        <div className="p-4 mb-4 rounded shadow bg-blue-50">
          <div className="font-semibold text-blue-700">
            Total pour {selectedService.label} regroupé par {adminLevel}
          </div>
          <div className="text-2xl text-right text-blue-800">{totalGroupedCount}</div>
        </div>
      )}
      
      {/* Tableau des données groupées */}
      <table className="min-w-full mb-8 bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 text-left bg-gray-50">
              {adminLevel.charAt(0).toUpperCase() + adminLevel.slice(1)}
            </th>
            <th className="p-2 text-left bg-gray-50">Nombre</th>
          </tr>
        </thead>
        <tbody>
          {groupedData.length === 0 ? (
            <tr>
              <td colSpan={2} className="p-2 text-center text-gray-400">
                {selectedService ? "Aucune donnée disponible" : "Sélectionnez un service"}
              </td>
            </tr>
          ) : (
            paginatedData?.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 border-b">{row[getColumnName(adminLevel)]}</td>
                <td className="p-2 font-semibold border-b">{row.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Pagination controls */}
      {groupedData.length > rowsPerPage && (
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span className="px-3 py-1">
            Page {currentPage} / {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      )}
      
      {/* Section des statistiques de distance */}
      <h3 className="mb-2 text-xl font-semibold">Statistiques de distance</h3>
      <p className="mb-4">Sélectionnez un service et un niveau administratif pour voir les statistiques de distance</p>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={selectedService?.name || ""}
          onChange={e => {
            const filteredService = statsSelectedLayers.filter(l => l.name.toLowerCase() === e.target.value.toLowerCase());
            if (filteredService.length > 0) setSelectedService(filteredService[0]);
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
          value={adminLevel}
          onChange={(e) => setAdminLevel(e.target.value)}
          className="p-2 border rounded min-w-[200px]"
        >
          <option value="commune">COMMUNE</option>
          <option value="departement">DEPARTEMENT</option>
          <option value="region">REGION</option>
        </select>
      </div>
      
      {/* Affichage des résultats de distance */}
      {distanceDatas && distanceDatas.results && distanceDatas.results.length > 0 ? (
        <div className="space-y-6">
          <div className="p-4 rounded shadow bg-blue-50">
            <div className="font-medium text-blue-700">
              Statistiques de distance pour {selectedService?.label} regroupées par {adminLevel}
            </div>
            <div className="mt-1 text-sm text-blue-600">
              {distanceDatas.results.length} divisions analysées
            </div>
          </div>
          
          {distanceDatas.results.map((division, index) => (
            <div key={index} className="p-4 bg-white rounded shadow">
              <h4 className="mb-4 text-lg font-semibold text-gray-800">
                {division.division_name} ({division.count} points)
              </h4>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-3 rounded bg-gray-50">
                  <div className="text-sm font-medium text-gray-600">Distance moyenne</div>
                  <div className="text-xl font-bold text-gray-800">
                    {division.distance_moyenne_metres} m
                  </div>
                </div>
                
                <div className="p-3 rounded bg-gray-50">
                  <div className="text-sm font-medium text-gray-600">Distance minimale</div>
                  <div className="text-xl font-bold text-gray-800">
                    {division.distance_minimale_metres} m
                  </div>
                </div>
                
                <div className="p-3 rounded bg-gray-50">
                  <div className="text-sm font-medium text-gray-600">Distance maximale</div>
                  <div className="text-xl font-bold text-gray-800">
                    {division.distance_maximale_metres} m
                  </div>
                </div>
                
                <div className="p-3 rounded bg-gray-50">
                  <div className="text-sm font-medium text-gray-600">Distance médiane</div>
                  <div className="text-xl font-bold text-gray-800">
                    {division.distance_mediane_metres} m
                  </div>
                </div>
                
                <div className="p-3 rounded bg-gray-50">
                  <div className="text-sm font-medium text-gray-600">Nombre de paires</div>
                  <div className="text-xl font-bold text-gray-800">
                    {division.nombre_paires}
                  </div>
                </div>
                
                <div className="p-3 rounded bg-gray-50">
                  <div className="text-sm font-medium text-gray-600">Points analysés</div>
                  <div className="text-xl font-bold text-gray-800">
                    {division.nombre_points_analysés}
                  </div>
                </div>
              </div>
              
              {division.message && (
                <div className="p-3 mt-3 text-sm text-blue-700 rounded bg-blue-50">
                  {division.message}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 rounded shadow bg-gray-50">
          {selectedService ? "Aucune statistique de distance disponible" : "Sélectionnez un service"}
        </div>
      )}
      
      {/* Anciennes cartes des statistiques de distance (pour compatibilité) */}
      {distanceDatas && !distanceDatas.results && (
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white rounded shadow text-primary-default">
              <div className="text-lg font-semibold">Distance moyenne</div>
              <div className="text-xl font-bold text-right text-primary-dark-op">
                {distanceDatas.distance_moyenne_metres} m
              </div>
            </div>
            
            <div className="p-4 bg-white rounded shadow text-primary-default">
              <div className="text-lg font-semibold">Distance minimale</div>
              <div className="text-xl font-bold text-right text-primary-dark-op">
                {distanceDatas.distance_minimale_metres} m
              </div>
            </div>
            
            <div className="p-4 bg-white rounded shadow text-primary-default">
              <div className="text-lg font-semibold">Distance maximale</div>
              <div className="text-xl font-bold text-right text-primary-dark-op">
                {distanceDatas.distance_maximale_metres} m
              </div>
            </div>
            
            <div className="p-4 bg-white rounded shadow text-primary-default">
              <div className="text-lg font-semibold">Distance médiane</div>
              <div className="text-xl font-bold text-right text-primary-dark-op">
                {distanceDatas.distance_mediane_metres} m
              </div>
            </div>
            
            <div className="p-4 bg-white rounded shadow text-primary-default">
              <div className="text-lg font-semibold">Points analysés</div>
              <div className="text-xl font-bold text-right text-primary-dark-op">
                {distanceDatas.nombre_points_analysés}
              </div>
            </div>
            
            <div className="p-4 bg-white rounded shadow text-primary-default">
              <div className="text-lg font-semibold">Nombre de paires</div>
              <div className="text-xl font-bold text-right text-primary-dark-op">
                {distanceDatas.nombre_paires}
              </div>
            </div>
          </div>
          
          {/* Message descriptif pour les distances */}
          {distanceDatas.message && (
            <div className="p-4 mt-4 rounded shadow bg-blue-50">
              <div className="font-medium text-blue-700">
                {distanceDatas.message}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;