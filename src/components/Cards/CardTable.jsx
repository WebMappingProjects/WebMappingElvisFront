import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppMainContext } from "../../context/AppProvider";
import axios from "../../api/axios";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ConfirmMessagePopup from "../popups/ConfirmMessagePopup";
import { ensureEPSG4326, refreshAccess, RequestType } from "../../utils/tools";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function CardTable({
  color,
  mainRoute,
  title,
  headRow,
  datasRows,
  geomType,
  coordsRows = null,
  apiRoute,
  originalEpsg,
}) {
  const { reloadDatas, setReloadDatas, dataSearch, setCurrentEditionPoint, setCurrentEditionFig, setCurrentProjectionSystem } = useAppMainContext();
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [messagePopupVisible, setMessagePopupVisible] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter data based on search term
  const filteredRows = datasRows.filter(row => 
    row.some(cell => 
      String(cell).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredCoordsRows = coordsRows 
    ? coordsRows.filter((_, index) => 
        datasRows[index].some(cell => 
          String(cell).toLowerCase().includes(searchTerm.toLowerCase())
      ))
    : null;

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Compute rows for current page
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const paginatedCoordsRows = filteredCoordsRows
    ? filteredCoordsRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : null;

  useEffect(() => {
    setCurrentPage(1);
  }, [dataSearch, searchTerm]);

  const handleCreation = (e) => {
    e.preventDefault();
    setCurrentEditionPoint([]);
    setCurrentProjectionSystem(originalEpsg);
    navigate(mainRoute, {
      state: {
        type: "create"
      }
    });
  };

  const handleEdition = (e, index) => {
    e.preventDefault();
    const globalIndex = (currentPage - 1) * rowsPerPage + index;
    
    if (geomType == "point") {
      const ensureTool = ensureEPSG4326([coordsRows[globalIndex][1], coordsRows[globalIndex][0]]);
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
      if (currentItemIndex == null) {
        console.log("No item selected");
        return null;
      }

      const globalIndex = (currentPage - 1) * rowsPerPage + currentItemIndex;
      const dataId = datasRows[globalIndex][0];
      const url = `${apiRoute}${dataId}`;
              
      const refreshDatas = await refreshAccess(url, RequestType.DELETE);
      
      let response = null;
      if (refreshDatas.response) {
        response = refreshDatas.response;
      } else {
        const token = refreshDatas.token;
        response = await axios.delete(url, {
          headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        });
      }

      setConfirmPopupVisible(false);
      setReloadDatas(!reloadDatas);
      
      setTimeout(() => {
        setMessagePopupVisible(true);
      }, 500);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const buttonHover = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };

  const buttonTap = {
    scale: 0.95
  };

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg overflow-hidden ${
          color === "light" ? "bg-white" : "bg-cyan-900 text-white"
        }`}
      >
        <div className="px-6 py-4 mb-0 border-0 rounded-t flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-3">
            <h3 className={`text-xl font-semibold ${
              color === "light" ? "text-primary-dark" : "text-white"
            }`}>
              {title}
            </h3>
          </div>

          <div className="flex items-center space-x-4 flex-wrap">
            {/* <div className={`relative mb-3 w-full md:w-auto flex items-center px-3 py-2 rounded-lg ${
              color === "light" ? "bg-gray-100" : "bg-cyan-800"
            }`}>
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Rechercher..."
                className={`bg-transparent border-none focus:outline-none w-40 ${
                  color === "light" ? "text-gray-700" : "text-white"
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div> */}

            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              className={`flex items-center px-4 cursor-pointer py-2 rounded-lg ${
                color === "light" 
                  ? "bg-primary-default text-white hover:bg-primary-dark" 
                  : "bg-cyan-700 text-white hover:bg-cyan-600"
              }`}
              onClick={handleCreation}
            >
              <FaPlus className="mr-2" />
              <span>Nouvelle donnée</span>
            </motion.button>
            <Tooltip id="add-tooltip" />
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <AnimatePresence>
            <motion.table
              variants={tableVariants}
              initial="hidden"
              animate="visible"
              className="items-center w-full bg-transparent border-collapse"
            >
              <thead>
                <tr>
                  {headRow.map((item, index) => (
                    <th
                      key={index}
                      className={`px-4 py-3 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                        color === "light"
                          ? "bg-primary-light-op text-primary-default border-primary-light"
                          : "bg-cyan-800 text-cyan-300 border-cyan-700"
                      }`}
                    >
                      {item}
                    </th>
                  ))}
                  <th
                    className={`px-4 py-3 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${
                      color === "light"
                        ? "bg-primary-light-op text-primary-default border-primary-light"
                        : "bg-cyan-800 text-cyan-300 border-cyan-700"
                    }`}
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {paginatedRows.length > 0 ? (
                    paginatedRows.map((item, itemIndex) => (
                      <motion.tr
                        key={(currentPage - 1) * rowsPerPage + itemIndex}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ 
                          backgroundColor: color === "light" ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.05)"
                        }}
                        className="border-b border-gray-200"
                      >
                        {item.map((data, dataIndex) => (
                          <td
                            key={dataIndex}
                            className={`py-3 px-4 text-sm align-middle whitespace-nowrap ${
                              color === "light"
                                ? "text-primary-default"
                                : "text-cyan-300"
                            } ${
                              dataIndex === 0 ? "font-medium text-center" : ""
                            }`}
                          >
                            {dataIndex == 0 
                              ? (currentPage - 1) * rowsPerPage + itemIndex + 1 
                              : Array.isArray(data) 
                                ? data[0] 
                                : data}
                          </td>
                        ))}
                        <td className="py-3 px-4 align-middle whitespace-nowrap">
                          <div className="flex justify-end space-x-2">
                            <motion.button
                              whileHover={buttonHover}
                              whileTap={buttonTap}
                              className="p-2 cursor-pointer rounded-full bg-teal-100 hover:bg-teal-200 text-teal-600"
                              onClick={(e) => handleEdition(e, itemIndex)}
                              data-tooltip-id="edit-tooltip"
                              data-tooltip-content="Modifier"
                            >
                              <FaEdit />
                            </motion.button>
                            <motion.button
                              whileHover={buttonHover}
                              whileTap={buttonTap}
                              className="p-2 rounded-full cursor-pointer bg-red-100 hover:bg-red-200 text-red-600"
                              onClick={() => {
                                setConfirmPopupVisible(true);
                                setCurrentItemIndex(itemIndex);
                              }}
                              data-tooltip-id="delete-tooltip"
                              data-tooltip-content="Supprimer"
                            >
                              <FaTrash />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-200"
                    >
                      <td 
                        colSpan={headRow.length + 1}
                        className="py-8 text-center text-gray-400"
                      >
                        Aucune donnée trouvée
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </motion.table>
          </AnimatePresence>

          {/* Pagination controls */}
          {filteredRows.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 flex-wrap">
              <div className={`text-sm mb-3 md:mb-0 text-center md:text-left w-full md:w-auto ${
                color === "light" ? "text-gray-600" : "text-cyan-300"
              }`}>
                Affichage de {(currentPage - 1) * rowsPerPage + 1} à{' '}
                {Math.min(currentPage * rowsPerPage, filteredRows.length)} sur{' '}
                {filteredRows.length} entrées
              </div>

              <div className="flex items-center space-x-2 justify-between w-full md:w-auto">
                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className={`px-4 py-2 rounded-md ${
                    color === "light"
                      ? "bg-gray-100 hover:bg-gray-200"
                      : "bg-cyan-800 hover:bg-cyan-700"
                  } ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Précédent
                </motion.button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={buttonHover}
                        whileTap={buttonTap}
                        className={`w-10 h-10 rounded-md ${
                          currentPage === pageNum
                            ? color === "light"
                              ? "bg-primary-default text-white"
                              : "bg-cyan-600 text-white"
                            : color === "light"
                              ? "bg-gray-100 hover:bg-gray-200"
                              : "bg-cyan-800 hover:bg-cyan-700"
                        }`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-2">...</span>
                  )}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <motion.button
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                      className={`w-10 h-10 rounded-md ${
                        color === "light"
                          ? "bg-gray-100 hover:bg-gray-200"
                          : "bg-cyan-800 hover:bg-cyan-700"
                      }`}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </motion.button>
                  )}
                </div>

                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className={`px-4 py-2 rounded-md ${
                    color === "light"
                      ? "bg-gray-100 hover:bg-gray-200"
                      : "bg-cyan-800 hover:bg-cyan-700"
                  } ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      <Tooltip id="edit-tooltip" />
      <Tooltip id="delete-tooltip" />
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};