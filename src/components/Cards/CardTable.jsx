import PropTypes from "prop-types";

// components

import TableDropdown from "../Dropdowns/TableDropdown";
import bootstrap from "../../assets/img/bootstrap.jpg";
import team_1 from "../../assets/img/team-1-800x800.jpg";
import team_2 from "../../assets/img/team-2-800x800.jpg";
import team_3 from "../../assets/img/team-3-800x800.jpg";
import team_4 from "../../assets/img/team-4-470x470.png";
import angular from "../../assets/img/angular.jpg";
import sketch from "../../assets/img/sketch.jpg";
import react from "../../assets/img/react.jpg";
import vue from "../../assets/img/vue.jpg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardTable({ color, mainRoute }) {
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
                Card Tables
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-primary-default border-primary-light"
                      : "bg-cyan-800 text-cyan-300 border-cyan-700")
                  }
                >
                  Project
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-primary-default border-primary-light"
                      : "bg-cyan-800 text-cyan-300 border-cyan-700")
                  }
                >
                  Budget
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-primary-default border-primary-light"
                      : "bg-cyan-800 text-cyan-300 border-cyan-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-primary-default border-primary-light"
                      : "bg-cyan-800 text-cyan-300 border-cyan-700")
                  }
                >
                  Users
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-primary-default border-primary-light"
                      : "bg-cyan-800 text-cyan-300 border-cyan-700")
                  }
                >
                  Completion
                </th>
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
              <tr>
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
                  {/* <TableDropdown /> */}
                  <Link 
                    className="p-4 m-2 rounded-full cursor-pointer bg-teal-50 hover:bg-teal-300" 
                    title="Modifier"
                    to={ mainRoute }>
                    <FaEdit className="text-sm text-teal-600"/>
                  </Link>
                  {/* <button 
                    className="p-4 m-2 rounded-full cursor-pointer bg-teal-50 hover:bg-teal-300" 
                    title="Modifier"
                    to={ mainRoute }>
                    <FaEdit className="text-sm text-teal-600"/>
                  </button> */}
                  <button className="p-4 m-2 rounded-full cursor-pointer bg-red-50 hover:bg-red-300" title="Supprimer">
                    <FaTrash className="text-sm text-red-600"/>
                  </button>
                </td>
              </tr>
              <tr>
                <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <img
                    src={angular}
                    className="w-12 h-12 bg-white border rounded-full"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-primary-default" : "text-white")
                    }
                  >
                    Angular Now UI Kit PRO
                  </span>
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  $1,800 USD
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-2 fas fa-circle text-emerald-500"></i>{" "}
                  completed
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
                    <span className="mr-2">100%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs rounded bg-emerald-200">
                        <div
                          style={{ width: "100%" }}
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-emerald-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 px-6 text-xs text-right align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <TableDropdown />
                </td>
              </tr>
              <tr>
                <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <img
                    src={ sketch }
                    className="w-12 h-12 bg-white border rounded-full"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-primary-default" : "text-white")
                    }
                  >
                    Black Dashboard Sketch
                  </span>
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  $3,150 USD
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-2 text-red-500 fas fa-circle"></i> delayed
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
                    <span className="mr-2">73%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs bg-red-200 rounded">
                        <div
                          style={{ width: "73%" }}
                          className="flex flex-col justify-center text-center text-white bg-red-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 px-6 text-xs text-right align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <TableDropdown />
                </td>
              </tr>
              <tr>
                <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <img
                    src={ react }
                    className="w-12 h-12 bg-white border rounded-full"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-primary-default" : "text-white")
                    }
                  >
                    React Material Dashboard
                  </span>
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  $4,400 USD
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-2 text-teal-500 fas fa-circle"></i> on
                  schedule
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
                    <span className="mr-2">90%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs bg-teal-200 rounded">
                        <div
                          style={{ width: "90%" }}
                          className="flex flex-col justify-center text-center text-white bg-teal-500 shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 px-6 text-xs text-right align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <TableDropdown />
                </td>
              </tr>
              <tr>
                <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <img
                    src={ vue }
                    className="w-12 h-12 bg-white border rounded-full"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-primary-default" : "text-white")
                    }
                  >
                    React Material Dashboard
                  </span>
                </th>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  $2,200 USD
                </td>
                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <i className="mr-2 fas fa-circle text-emerald-500"></i>{" "}
                  completed
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
                    <span className="mr-2">100%</span>
                    <div className="relative w-full">
                      <div className="flex h-2 overflow-hidden text-xs rounded bg-emerald-200">
                        <div
                          style={{ width: "100%" }}
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap bg-emerald-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 px-6 text-xs text-right align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                  <TableDropdown />
                </td>
              </tr>
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
