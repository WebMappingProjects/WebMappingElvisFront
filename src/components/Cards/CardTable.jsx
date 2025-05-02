import PropTypes from "prop-types";

// components

import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardTable({ color, mainRoute, title, headRow, datasRows }) {
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
            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-primary-dark" : "text-white")
                }
              >
                { title }
              </h3>
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
                        "p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap " +
                        (color === "light"
                          ? "bg-blueGray-50 text-primary-default border-primary-light"
                          : "bg-cyan-800 text-cyan-300 border-cyan-700")
                      }
                    >
                      {data}
                    </td>
                  ))}
                  <td className="flex flex-row p-4 px-6 text-xs text-right align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                    <Link 
                      className="p-4 m-2 rounded-full cursor-pointer bg-teal-50 hover:bg-teal-300" 
                      title="Modifier"
                      to={ mainRoute }>
                      <FaEdit className="text-sm text-teal-600"/>
                    </Link>
                    <button className="p-4 m-2 rounded-full cursor-pointer bg-red-50 hover:bg-red-300" title="Supprimer">
                      <FaTrash className="text-sm text-red-600"/>
                    </button>
                  </td>
                </tr>
              ))}
              {/* <tr>
                <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <img
                    src={ bootstrap }
                    className="w-12 h-12 bg-white border rounded-full"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-primary-default" : "text-white")
                    }
                  >
                    Argon Design System
                  </span>
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  $2,500 USD
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-2 text-orange-500 fas fa-circle"></i> pending
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex">
                    <img
                      src={team_1}
                      alt="..."
                      className="w-10 h-10 border-2 rounded-full shadow border-blueGray-50"
                    ></img>
                    <img
                      src={team_2}
                      alt="..."
                      className="w-10 h-10 -ml-4 border-2 rounded-full shadow border-blueGray-50"
                    ></img>
                    <img
                      src={team_3}
                      alt="..."
                      className="w-10 h-10 -ml-4 border-2 rounded-full shadow border-blueGray-50"
                    ></img>
                    <img
                      src={team_4}
                      alt="..."
                      className="w-10 h-10 -ml-4 border-2 rounded-full shadow border-blueGray-50"
                    ></img>
                  </div>
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">60%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs bg-red-200 rounded">
                        <div
                          style={{ width: "60%" }}
                          className="flex flex-col justify-center text-center text-white bg-red-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="flex flex-row p-4 px-6 text-xs text-right align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <TableDropdown />
                  <Link 
                    className="p-4 m-2 rounded-full cursor-pointer bg-teal-50 hover:bg-teal-300" 
                    title="Modifier"
                    to={ mainRoute }>
                    <FaEdit className="text-sm text-teal-600"/>
                  </Link>
                  <button 
                    className="p-4 m-2 rounded-full cursor-pointer bg-teal-50 hover:bg-teal-300" 
                    title="Modifier"
                    to={ mainRoute }>
                    <FaEdit className="text-sm text-teal-600"/>
                  </button>
                  <button className="p-4 m-2 rounded-full cursor-pointer bg-red-50 hover:bg-red-300" title="Supprimer">
                    <FaTrash className="text-sm text-red-600"/>
                  </button>
                </td>
              </tr> */}
              
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
