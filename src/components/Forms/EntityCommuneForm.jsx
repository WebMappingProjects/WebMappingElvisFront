import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import axios from "../../api/axios";
import { convertCoords, getValueFromIdx } from "../../utils/tools";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";

const API_URL = `/gis/communes/`;
const API_REGIONS_URL = `/gis/regions`;
const API_DEPARTEMENTS_URL = `/gis/departements`;

const EntityCommuneForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ area, setArea ] = useState(0);
    const [ maire, setMaire ] = useState("");
    const [ reg, setReg ] = useState(0);
    const [ dept, setDept ] = useState("");

    const { currentEditionPoint, currentProjectionSystem,
        currentEditionFig
     } = useAppMainContext();
     
    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
    const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);

    const [ regions, setRegions ] = useState([]);
    const [ departements, setDepartements ] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if(datas != null)
        {
            setName(getValueFromIdx(datas, 1));
            setArea(getValueFromIdx(datas, 2));
            setMaire(getValueFromIdx(datas, 3));
            setDept(getValueFromIdx(datas, 4));
            setReg(getValueFromIdx(datas, 5));
        }
    }, []);

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
    /**/
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            
            // Convertir Polygon en MultiPolygon pour correspondre au modèle Django
            let geometry = currentEditionFig;
            
            if (currentEditionFig && currentEditionFig.type === "Polygon") {
                geometry = {
                    type: "MultiPolygon",
                    coordinates: [currentEditionFig.coordinates]
                };
            }
            console.log("REG", reg);
            const response = await axios.post(API_URL, {
                "geom": geometry,
                "departement": dept,
                "maire": maire,
                "superficie": area, 
                "nom": name
            }, { 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("RESPONSE", response);
            setMessagePopupVisible(true);
        } catch (e) {
            setErrorPopupVisible(true);
            console.error("ERROR", e);
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            let geometry = currentEditionFig;
            
            if (currentEditionFig && currentProjectionSystem !== 4326) {
                // Conversion des coordonnées si nécessaire
                geometry = {
                    ...currentEditionFig,
                    coordinates: currentEditionFig.type === "Polygon" 
                        ? [currentEditionFig.coordinates[0].map(coord => 
                            convertCoords([coord[1], coord[0]]).coords.reverse()
                        )]
                        : currentEditionFig.coordinates.map(coord => 
                            convertCoords([coord[1], coord[0]]).coords.reverse()
                        )
                };
            }

            // Convertir Polygon en MultiPolygon
            if (geometry && geometry.type === "Polygon") {
                geometry = {
                    type: "MultiPolygon",
                    coordinates: [geometry.coordinates]
                };
            }

            const response = await axios.patch(`${API_URL}${datas[0]}`, {
                "geom": geometry,
                "departement": dept,
                "maire": maire,
                "superficie": area,
                "nom": name
            }, { 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("RESPONSE", response);
            setMessagePopupVisible(true);
        } catch (e) {
            setErrorPopupVisible(true);
            console.error("ERROR", e);
        }
    }
    
    return (
        <>
            <SimpleMessagePopup message="Operation effectuee avec succes" onClose={() => { setMessagePopupVisible(false); navigate(-1); }} open={messagePopupVisible} />
            <ErrorMessagePopup message="ERREUR : Veuillez remplir tous les champs pour pouvoir continuer" onClose={() => { setErrorPopupVisible(false); }} open={errorPopupVisible} />
            <div className="relative flex-auto px-4 py-10 rounded shadow lg:px-10 bg-neutral-200">
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Commune</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour la commune
                </div>
                <form>


                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="nom"
                        >
                            Nom
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Nom"
                            id="nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="area"
                        >
                            Superficie  (m²)
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Superficie  (m²)"
                            id="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="maire"
                        >
                            Nom du maire
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Nom du maire"
                            id="maire"
                            value={maire}
                            onChange={(e) => setMaire(e.target.value)}
                        />
                    </div>

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

                    <Actions 
                        handleSave={handleSave}
                        handleEdit={handleEdit}
                    />
                </form>
            </div>
        </>
    );
}

export default EntityCommuneForm;