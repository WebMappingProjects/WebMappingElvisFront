import PropTypes from "prop-types";

// components

import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function CardTable({ color, mainRoute, title, headRow, datasRows }) {

  const navigate = useNavigate();

  const handleCreation = (e) => {
      e.preventDefault();

      navigate(mainRoute, {
        state: {
          type: "create"
        }
      });
  }

  const handleEdition = (e) => {
    e.preventDefault();
      navigate(mainRoute, {
        state: {
          type: "edit"
        }
      });
  }

  return (
    <>
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
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-primary-default border-primary-light"
                        : "bg-cyan-800 text-cyan-300 border-cyan-700")
                    }
                  >
                    {item}
                  </th>
                ))}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-primary-default border-primary-light"
                      : "bg-cyan-800 text-cyan-300 border-cyan-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {datasRows.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  {item.map((data, dataIndex) => (
                    <td
                      key={dataIndex}
                      className={
                        "p-2 px-4 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap " +
                        (color === "light"
                          ? "bg-blueGray-50 text-primary-default border-primary-light"
                          : "bg-cyan-800 text-cyan-300 border-cyan-700")
                      }
                    >
                      {data}
                    </td>
                  ))}
                  <td className="flex flex-row p-2 px-4 text-xs text-right align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    <Link
                      className="p-4 m-2 rounded-full cursor-pointer bg-teal-50 hover:bg-teal-300"
                      title="Modifier"
                      onClick={handleEdition}
                      >
                      {/* to={ mainRoute }> */}
                      <FaEdit className="text-sm text-teal-600"/>
                    </Link>
                    <button className="p-4 m-2 rounded-full cursor-pointer bg-red-50 hover:bg-red-300" title="Supprimer">
                      <FaTrash className="text-sm text-red-600"/>
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
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
