import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios, { API_COMMUNE_URL, API_DEPARTEMENTS_URL, API_REGIONS_URL } from "../../api/axios";

const Selections = ({ reg, setReg, dept, setDept, com, setCom }) => {

    const [ regions, setRegions ] = useState([]);
    const [ departements, setDepartements ] = useState([]);
    const [ communes, setCommunes ] = useState([]);

    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const loadRegions = async () => {
            const response = await axios.get(API_REGIONS_URL, { 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            setRegions(response?.data);
        }

        loadRegions();
    }, []);
    
    useEffect(() => {
        const loadDepartments = async () => {
            console.log("REGION", reg);
            if(reg != 0)
            {
                const response = await axios.get(`${API_DEPARTEMENTS_URL}?region=${reg}`, { 
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                

                setDepartements(response?.data);
            }
        }

        loadDepartments();
    }, [reg]);

    useEffect(() => {
        const loadCommunes = async () => {
            const response = await axios.get(`${API_COMMUNE_URL}?departement=${dept}`, { headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
            }});

            setCommunes(response?.data);
        }

        loadCommunes();
    }, [dept]);

    return (
        <>
            <div className="relative w-full mb-3">
                <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="region"
                >
                    Région
                </label>
                <select
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                    id="region"
                    value={reg}
                    onChange={(e) => setReg(e.target.value)}
                >
                    <option value={0}>--- SELECTIONNER UNE REGION ---</option>
                    {regions?.features?.map((t) => (
                        <option key={t.id} value={t.id}>{t.properties.nom}</option>
                    ))}
                </select>
            </div>

            <div className="relative w-full mb-3">
                <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="dept"
                >
                    Département
                </label>
                <select
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                    id="dept"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                >
                    <option value={0}>--- SELECTIONNER UN DEPARTEMENT ---</option>
                    {departements?.features?.map((t) => (
                        <option key={t.id} value={t.id}>{t.properties.nom}</option>
                    ))}
                </select>
            </div>

            <div className="relative w-full mb-3">
                <label
                    className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="commune"
                >
                    Commune
                </label>
                <select
                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                    id="commune"
                    value={com}
                    onChange={(e) => setCom(e.target.value)}
                >
                    <option value={0}>--- SELECTIONNER UNE COMMUNE ---</option>
                    {communes?.features?.map((t) => (
                        <option key={t.id} value={t.id}>{t.properties.nom}</option>
                    ))}
                </select>
            </div>
        </>
    );
}

Selections.propTypes = {
    handleSave: PropTypes.object,
    handleEdit: PropTypes.object
}

export default Selections;