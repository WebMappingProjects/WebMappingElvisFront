import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAppMainContext } from "../context/AppProvider";

// Liste des services dynamiquement récupérée depuis la sidebar
const allLayers = [
  { name: "enseignement_de_base_font_point", label: "Enseignement de base" },
  { name: "ecoles_mat_primaire_point", label: "Ecoles maternelles et primaires" },
  { name: "enseignements_secondaires_final_point", label: "Enseignement Secondaire" },
  { name: "enseignement_superieur_custom_point", label: "Enseignement superieur" },
  { name: "pharmacies_point", label: "Pharmacies" },
  { name: "eglises_catholiques_font_point", label: "Eglises Catholiques" },
  { name: "eglises_presbyteriennes_font_point", label: "Eglises Presbyteriennes" },
  { name: "eglises_protestantes_point", label: "Eglises Protestantes" },
  { name: "mosquees_font_point", label: "Mosquées" },
  { name: "nations_unies_point", label: "Nations Unies" },
  { name: "banques_et_microfinances_custom_point", label: "Banques et microfinances" },
  { name: "cites_municipales_cuy_point", label: "Cites Municipales" },
  { name: "centre_special_detat_civil_font_point", label: "Centres special detat civil" },
  { name: "mairies_yaounde_custom_point", label: "Mairies Yaounde" },
  { name: "prefectures_sous-prefectures_custom_point", label: "Prefectures/sous-prefectures" },
  { name: "ambassades_point", label: "Ambassades" },
  { name: "gendarmeries_point", label: "Gendarmeries" },
  { name: "commissariats_yde_font_point", label: "Commissariats" },
  { name: "restaurants_yaounde_font_point", label: "Restaurants" },
  { name: "boulangeries_custom_point", label: "Boulangeries" },
  { name: "centres_culturels_custom_point", label: "Centres Culturels" },
  { name: "hotels_font_point", label: "Hotels" },
  { name: "monuments_custom_point", label: "Monuments" },
  { name: "lieux_remarquables_point", label: "Lieux remarquables" },
  { name: "auberges_custom_point", label: "Auberges" },
  { name: "bouches_incendies_yde_custom_point", label: "Bouches incendies" },
  { name: "garages_custom_point", label: "Garages" },
  { name: "complexes_sportifs_custom_point", label: "Complexes Sportifs" },
  { name: "sapeurs_pompier_point", label: "Sapeur pompier" },
  { name: "laveries_font_point", label: "Laveries" },
  { name: "stations_sevices_font_point", label: "Stations Services" },
  { name: "agences_de_voyages_font_point", label: "Agences de Voyages" },
];

// Colonnes groupables par service (à adapter selon le backend)
const groupableColumns = {
  enseignement_de_base_font_point: ["quartier", "fondateur"],
  ecoles_mat_primaire_point: ["quartier", "fondateur"],
  enseignements_secondaires_final_point: ["quartier", "fondateur"],
  enseignement_superieur_custom_point: ["quartier", "type"],
  pharmacies_point: ["quartier"],
  eglises_catholiques_font_point: ["quartier"],
  eglises_presbyteriennes_font_point: ["quartier"],
  eglises_protestantes_point: ["quartier"],
  mosquees_font_point: ["quartier"],
  nations_unies_point: ["quartier"],
  banques_et_microfinances_custom_point: ["quartier"],
  cites_municipales_cuy_point: ["quartier"],
  centre_special_detat_civil_font_point: ["quartier"],
  mairies_yaounde_custom_point: ["quartier"],
  prefectures_sous_prefectures_custom_point: ["quartier"],
  ambassades_point: ["quartier"],
  gendarmeries_point: ["quartier"],
  commissariats_yde_font_point: ["quartier"],
  restaurants_yaounde_font_point: ["quartier"],
  boulangeries_custom_point: ["quartier"],
  centres_culturels_custom_point: ["quartier"],
  hotels_font_point: ["quartier"],
  monuments_custom_point: ["quartier"],
  lieux_remarquables_point: ["quartier"],
  auberges_custom_point: ["quartier"],
  bouches_incendies_yde_custom_point: ["quartier"],
  garages_custom_point: ["quartier"],
  complexes_sportifs_custom_point: ["quartier"],
  sapeurs_pompier_point: ["quartier"],
  laveries_font_point: ["quartier"],
  stations_sevices_font_point: ["quartier"],
  agences_de_voyages_font_point: ["quartier"],
};

const StatsDashboard = () => {
  const { selectedLayers } = useAppMainContext();
  // Service sélectionné : le premier de la sélection ou le premier de la liste
  const selectedService = selectedLayers[0]?.name || allLayers[0].name;
  const [selectedColumn, setSelectedColumn] = useState(groupableColumns[selectedService][0]);
  const [counts, setCounts] = useState({});
  const [groupedData, setGroupedData] = useState([]);
  const [avgDistance, setAvgDistance] = useState(null);

  useEffect(() => {
    // Récupère le nombre d'enregistrements pour chaque service
    allLayers.forEach(async (service) => {
      try {
        const res = await axios.get(`/api/${service.name}/count/`);
        setCounts((prev) => ({ ...prev, [service.name]: res.data.count }));
      } catch (e) {}
    });
  }, []);

  useEffect(() => {
    // Met à jour la colonne sélectionnée si le service change
    setSelectedColumn(groupableColumns[selectedService][0]);
  }, [selectedService]);

  useEffect(() => {
    // Récupère les données groupées
    if (selectedService && selectedColumn) {
      axios
        .get(`/api/${selectedService}/groupby/${selectedColumn}/`)
        .then((res) => setGroupedData(res.data))
        .catch(() => setGroupedData([]));
    }
  }, [selectedService, selectedColumn]);

  useEffect(() => {
    // Récupère la distance moyenne
    if (selectedService) {
      axios
        .get(`/api/${selectedService}/average-distance/`)
        .then((res) => setAvgDistance(res.data.average_distance))
        .catch(() => setAvgDistance(null));
    }
  }, [selectedService]);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Statistiques globales</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {allLayers.map((service) => (
          <div key={service.name} className="bg-white rounded shadow p-4 min-w-[200px]">
            <div className="font-semibold">{service.label}</div>
            <div className="text-3xl">{counts[service.name] ?? "..."}</div>
          </div>
        ))}
      </div>
      <h3 className="mb-2 text-xl font-semibold">Regroupement par colonne</h3>
      <div className="flex gap-4 mb-4">
        <select
          value={selectedService}
          onChange={e => setSelectedColumn(groupableColumns[e.target.value][0])}
          className="p-2 border rounded"
          disabled
        >
          {allLayers.map((service) => (
            <option key={service.name} value={service.name}>
              {service.label}
            </option>
          ))}
        </select>
        <select
          value={selectedColumn}
          onChange={e => setSelectedColumn(e.target.value)}
          className="p-2 border rounded"
        >
          {groupableColumns[selectedService].map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full mb-8 bg-white rounded shadow">
        <thead>
          <tr>
            <th className="p-2 text-left">{selectedColumn}</th>
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
            groupedData.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2">{row[selectedColumn]}</td>
                <td className="p-2">{row.count}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <h3 className="mb-2 text-xl font-semibold">Distance moyenne entre services de même type</h3>
      <div className="bg-white rounded shadow p-4 min-w-[200px]">
        {avgDistance === null ? "..." : `${avgDistance.toFixed(2)} m`}
      </div>
    </div>
  );
};

export default StatsDashboard;
