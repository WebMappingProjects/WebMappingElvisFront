import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// components

import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppMainContext } from "../../context/AppProvider";
import axios from "../../api/axios";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ConfirmMessagePopup from "../popups/ConfirmMessagePopup";
import { ensureEPSG4326 } from "../../utils/tools";

export default function CardTable({ color, mainRoute, title, headRow, datasRows, coordsRows = null, apiRoute, originalEpsg }) {

  const { reloadDatas, setReloadDatas } = useAppMainContext();

  const [ confirmPopupVisible, setConfirmPopupVisible ] = useState(false);
  const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);

  const [ currentItemIndex, setCurrentItemIndex ] = useState(null);

  const { dataSearch, setCurrentEditionPoint, setCurrentProjectionSystem } = useAppMainContext();

  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(datasRows.length / rowsPerPage);

  // Compute rows for current page
  const paginatedRows = datasRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const paginatedCoordsRows = coordsRows
    ? coordsRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : null;

    useEffect(() => {
      setCurrentPage(1);
    }, [dataSearch]);

  const handleCreation = (e) => {
      e.preventDefault();

      setCurrentEditionPoint([]);
      setCurrentProjectionSystem(originalEpsg);

      navigate(mainRoute, {
        state: {
          type: "create"
        }
      });
  }

  const handleEdition = (e, index) => {
    e.preventDefault();
    const globalIndex = (currentPage - 1) * rowsPerPage + index;
    const ensureTool = ensureEPSG4326([ coordsRows[globalIndex][1], coordsRows[globalIndex][0] ]);
    const epsg4326Coords = ensureTool.coords;
    setCurrentProjectionSystem(originalEpsg);
    
    setCurrentEditionPoint([ epsg4326Coords[1], epsg4326Coords[0] ]);
    //setCurrentEditionPoint([ coordsRows[globalIndex][0], coordsRows[globalIndex][1] ]);

    navigate(mainRoute, {
      state: {
        type: "edit",
        datas: datasRows[globalIndex]
      }
    });
  }

  const handleDelete = async (e) => {
    try
    {
      e.preventDefault();
      if(currentItemIndex == null)
      {
        console.log("No item selected");
        return null;
      }

      const globalIndex = (currentPage - 1) * rowsPerPage + currentItemIndex;

      const dataId = datasRows[globalIndex][0];

      const token = localStorage.getItem("token");
      await axios.delete(`${apiRoute}${dataId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      setConfirmPopupVisible(false);
      setReloadDatas(!reloadDatas);
      
      setTimeout(() => {
        setMessagePopupVisible(true);
      }, 500);
    } catch (error)
    {
      console.error("ERROR", error);
    }
  }
  return (
    <>
      <SimpleMessagePopup message="Operation effectuee avec succees" onClose={() => { setMessagePopupVisible(false) }} open={messagePopupVisible} />
      <ConfirmMessagePopup onConfirm={(e) => handleDelete(e)} onCancel={() => setConfirmPopupVisible(false)} open={confirmPopupVisible} />

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-cyan-900 text-white")
        }
      >
        <div className="px-4 py-3 mb-0 border-0 rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex flex-row px-4">
              <span
                className={ `font-semibold text-lg ${ color === "light" ? "text-primary-dark" : "text-white"}` }
              >
                { title }
              </span>

              <Link
                className="flex flex-row items-center justify-center px-5 ml-4 rounded text-primary-dark hover:bg-primary-light-op"
                title="Nouvelle donnee"
                onClick={handleCreation}>
                <FaPlus className="text-sm"/>
                <span className="ml-2"> Nouvelle donnee</span>
              </Link>

            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {headRow.map((item, index) => (
                  <th
                    key={index}
                    className={
                      "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-primary-light-op text-primary-default border-primary-light"
                        : "bg-cyan-800 text-cyan-300 border-cyan-700")
                    }
                  >
                    {item}
                  </th>
                ))}
                <th
                  className={
                    "px-2 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-primary-light-op text-primary-default border-primary-light"
                      : "bg-cyan-800 text-cyan-300 border-cyan-700")
                  }
                >ACTIONS</th>
              </tr>
            </thead>
            <tbody>
               {paginatedRows.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  {item.map((data, dataIndex) => (
                    <td
                      key={dataIndex}
                      className={
                        "py-1 px-4 text-xs align-middle border-b whitespace-nowrap" +
                        (color === "light"
                          ? "bg-primary-light-op text-primary-default border-primary-light-op"
                          : "bg-cyan-800 text-cyan-300 border-cyan-700") + 
                        (dataIndex == 0 ? "text-center border-b border-primary-light-op" : "")
                      }
                    >
                      { dataIndex == 0 ? ((currentPage - 1) * rowsPerPage + itemIndex + 1) : data }
                    </td>
                  ))}
                  <td className={"flex flex-row px-4 text-xs text-right align-middle border-b whitespace-nowrap" + 
                    (color === "light"
                          ? "bg-primary-light-op text-primary-default border-primary-light-op"
                          : "bg-cyan-800 text-cyan-300 border-cyan-700")
                  }>
                    <Link
                      className="p-3 mx-4 my-2 rounded-full cursor-pointer bg-teal-50 hover:bg-teal-300"
                      title="Modifier"
                      onClick={(e) => handleEdition(e, itemIndex)}
                    >
                      {/* to={ mainRoute }> */}
                      <FaEdit className="text-sm text-teal-600"/>
                    </Link>
                    <button className="p-3 mx-4 my-2 rounded-full cursor-pointer bg-red-50 hover:bg-red-300" title="Supprimer"
                      onClick={() => { setConfirmPopupVisible(true); setCurrentItemIndex(itemIndex)}}
                    >
                      <FaTrash className="text-sm text-red-600"/>
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          {paginatedRows.length == 0 ? (
            <div className="flex items-center justify-center gap-2 py-2 mt-4 text-lg text-gray-400 md:text-xl">
              AUCUNE DONNEE TROUVEE
            </div>
          ) : (<></>)}
          {/* Pagination controls */}
          <div className="flex items-center justify-center gap-2 py-2 mt-4 text-xs">
            <button
              className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50 w-30 hover:bg-gray-100"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            {/* <span>
              Page {currentPage} / {totalPages}
            </span> */}
            <span>
              Page <input type="number" 
                value={currentPage}
                min={1} 
                max={totalPages}
                onChange={(e) => setCurrentPage(e.target.value)} 
                className="w-10 px-2 py-1 mx-2 border rounded-sm no-arrows"/> / {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded cursor-pointer disabled:opacity-50 w-30 hover:bg-gray-100"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
