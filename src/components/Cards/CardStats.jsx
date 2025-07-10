
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { 
  Edit3, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  AlertCircle,
  CheckCircle
} from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// Mock des dépendances pour la démo
const mockContext = {
  reloadDatas: false,
  setReloadDatas: () => {},
  dataSearch: "",
  setCurrentEditionPoint: () => {},
  setCurrentEditionFig: () => {},
  setCurrentProjectionSystem: () => {}
};

const mockAxios = {
  delete: () => Promise.resolve()
};

const mockEnsureEPSG4326 = (coords) => ({ coords });

// Composants de popup simplifiés pour la démo
const SimpleMessagePopup = ({ message, onClose, open }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        <div className="flex items-center mb-4 space-x-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">Succès</h3>
        </div>
        <p className="mb-4 text-gray-600">{message}</p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const ConfirmMessagePopup = ({ onConfirm, onCancel, open }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        <div className="flex items-center mb-4 space-x-3">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h3>
        </div>
        <p className="mb-6 text-gray-600">
          Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 text-gray-800 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CardTable({ 
  color = "light", 
  mainRoute, 
  title, 
  headRow, 
  datasRows, 
  geomType, 
  coordsRows = null, 
  apiRoute, 
  originalEpsg 
}) {
  // Mock du contexte pour la démo
  const { reloadDatas, setReloadDatas, dataSearch, setCurrentEditionPoint, setCurrentEditionFig, setCurrentProjectionSystem } = mockContext;
  
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [localSearch, setLocalSearch] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = () => {};

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtrage et tri des données
  const filteredRows = datasRows.filter(row => {
    if (!localSearch) return true;
    return row.some(cell => 
      String(cell).toLowerCase().includes(localSearch.toLowerCase())
    );
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    const direction = sortDirection === "asc" ? 1 : -1;
    return aVal > bVal ? direction : -direction;
  });

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const paginatedCoordsRows = coordsRows
    ? coordsRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : null;

  useEffect(() => {
    setCurrentPage(1);
  }, [dataSearch, localSearch]);

  const handleCreation = (e) => {
    e.preventDefault();
    setCurrentEditionPoint([]);
    setCurrentProjectionSystem(originalEpsg);
    navigate(mainRoute, { state: { type: "create" } });
  };

  const handleEdition = (e, index) => {
    e.preventDefault();
    const globalIndex = (currentPage - 1) * rowsPerPage + index;
    
    if (geomType === "point") {
      const ensureTool = mockEnsureEPSG4326([coordsRows[globalIndex][1], coordsRows[globalIndex][0]]);
      const epsg4326Coords = ensureTool.coords;
      setCurrentProjectionSystem(originalEpsg);
      setCurrentEditionPoint([epsg4326Coords[1], epsg4326Coords[0]]);
    } else {
      setCurrentEditionFig(coordsRows[globalIndex]);
    }

    navigate(mainRoute, {
      state: {
        type: "edit",
        datas: datasRows[globalIndex]
      }
    });
  };

  const handleDelete = async (e) => {
    try {
      e.preventDefault();
      if (currentItemIndex == null) return;

      const globalIndex = (currentPage - 1) * rowsPerPage + currentItemIndex;
      const dataId = datasRows[globalIndex][0];

      const token = localStorage.getItem("token");
      await mockAxios.delete(`${apiRoute}${dataId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      setConfirmPopupVisible(false);
      setReloadDatas(!reloadDatas);
      
      setTimeout(() => {
        setMessagePopupVisible(true);
      }, 500);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleSort = (fieldIndex) => {
    if (sortField === fieldIndex) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(fieldIndex);
      setSortDirection("asc");
    }
  };

  const handleSelectRow = (index) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedRows.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedRows.map((_, index) => index)));
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const isDark = color === "dark";

  return (
    <>
      <SimpleMessagePopup 
        message="Opération effectuée avec succès" 
        onClose={() => setMessagePopupVisible(false)} 
        open={messagePopupVisible} 
      />
      <ConfirmMessagePopup 
        onConfirm={handleDelete} 
        onCancel={() => setConfirmPopupVisible(false)} 
        open={confirmPopupVisible} 
      />

      <div className={`relative bg-white rounded-xl shadow-lg border transition-all duration-300 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        
        {/* Header amélioré */}
        <div className={`px-6 py-4 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <h2 className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {sortedRows.length} éléments
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Barre de recherche */}
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              {/* Boutons d'action */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Filtres"
              >
                <Filter className="w-5 h-5" />
              </button>
              
              <button
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Exporter"
              >
                <Download className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleCreation}
                className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                <span>Nouvelle donnée</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contenu du tableau */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${
              isDark ? 'bg-gray-750' : 'bg-gray-50'
            } border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedRows.length && paginatedRows.length > 0}
                    onChange={handleSelectAll}
                    className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                {headRow.map((header, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    onClick={() => handleSort(index)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{header}</span>
                      {sortField === index && (
                        <span className={`transform transition-transform ${
                          sortDirection === 'desc' ? 'rotate-180' : ''
                        }`}>
                          ↑
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isDark ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {paginatedRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`transition-colors hover:bg-gray-50 ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  } ${selectedRows.has(rowIndex) ? (isDark ? 'bg-gray-700' : 'bg-blue-50') : ''}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => handleSelectRow(rowIndex)}
                      className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-6 py-4 text-sm ${
                        isDark ? 'text-gray-300' : 'text-gray-900'
                      }`}
                    >
                      {cellIndex === 0 
                        ? (currentPage - 1) * rowsPerPage + rowIndex + 1
                        : Array.isArray(cell) ? cell[0] : cell
                      }
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={(e) => handleEdition(e, rowIndex)}
                        className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-100"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmPopupVisible(true);
                          setCurrentItemIndex(rowIndex);
                        }}
                        className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-100"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Message si aucune donnée */}
          {paginatedRows.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4" />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-900'
              }`}>
                Aucune donnée trouvée
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </div>

        {/* Pagination améliorée */}
        {totalPages > 1 && (
          <div className={`px-6 py-4 border-t ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Affichage de {(currentPage - 1) * rowsPerPage + 1} à{' '}
                  {Math.min(currentPage * rowsPerPage, sortedRows.length)} sur{' '}
                  {sortedRows.length} résultats
                </span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className={`px-3 py-1 rounded border text-sm ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value={10}>10 par page</option>
                  <option value={25}>25 par page</option>
                  <option value={50}>50 par page</option>
                  <option value={100}>100 par page</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : isDark 
                          ? 'hover:bg-gray-700 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                    isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Exemple d'utilisation avec des données de démonstration
function TableDemo() {
  const sampleData = [
    ["1", "John Doe", "john@example.com", "Admin", "2024-01-15"],
    ["2", "Jane Smith", "jane@example.com", "User", "2024-01-16"],
    ["3", "Bob Johnson", "bob@example.com", "Editor", "2024-01-17"],
    ["4", "Alice Brown", "alice@example.com", "User", "2024-01-18"],
    ["5", "Charlie Wilson", "charlie@example.com", "Admin", "2024-01-19"],
    ["6", "Diana Davis", "diana@example.com", "Editor", "2024-01-20"],
    ["7", "Frank Miller", "frank@example.com", "User", "2024-01-21"],
    ["8", "Grace Taylor", "grace@example.com", "Admin", "2024-01-22"],
    ["9", "Henry Anderson", "henry@example.com", "User", "2024-01-23"],
    ["10", "Ivy Thompson", "ivy@example.com", "Editor", "2024-01-24"],
  ];

  const headers = ["ID", "Nom", "Email", "Rôle", "Date de création"];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <CardTable
          color="light"
          title="Gestion des utilisateurs"
          headRow={headers}
          datasRows={sampleData}
          mainRoute="/users"
          apiRoute="/api/users/"
          geomType="point"
          originalEpsg="EPSG:4326"
        />
      </div>
    </div>
  );
}

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  mainRoute: PropTypes.string,
  title: PropTypes.string,
  headRow: PropTypes.array,
  datasRows: PropTypes.array,
  geomType: PropTypes.string,
  coordsRows: PropTypes.array,
  apiRoute: PropTypes.string,
  originalEpsg: PropTypes.string,
};

export { TableDemo };