import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import axios, { API_DEPARTEMENTS_URL, API_REGIONS_URL } from "../../api/axios";
import { convertCoords, getValueFromIdx, refreshAccess, RequestType } from "../../utils/tools";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";

const API_URL = `/gis/communes/`;

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
            const url = API_REGIONS_URL;

            const refreshDatas = await refreshAccess(url, RequestType.GET);

            let response = null;
            if(refreshDatas.response) response = refreshDatas.response;
            else {
                const token = refreshDatas.token;
                response = await axios.get(url, { headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, withCredentials: true });
            }

            setRegions(response?.data);
        }

        loadRegions();
    }, []);

    useEffect(() => {
        const loadDepartments = async () => {
            if(reg != 0)
            {
                const url = `${API_DEPARTEMENTS_URL}?region=${reg}`;

                const refreshDatas = await refreshAccess(url, RequestType.GET);

                let response = null;
                if(refreshDatas.response) response = refreshDatas.response;
                else {
                    const token = refreshDatas.token;
                    response = await axios.get(url, { headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }, withCredentials: true });
                }
                

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
            const url = API_URL;
            const data = {
                "geom": geometry,
                "departement": dept,
                "maire": maire,
                "superficie": area, 
                "nom": name
            };

            const refreshDatas = await refreshAccess(url, RequestType.POST, data);

            let response = null;
            if(refreshDatas.response) response = refreshDatas.response;
            else {
                const token = refreshDatas.token;
                response = await axios.post(url, data, { headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, withCredentials: true });
            }

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

            /*let geometry = currentEditionFig;
            
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
            }*/
           // Convertir Polygon en MultiPolygon pour correspondre au modèle Django
            let geometry = currentEditionFig;
            
            if (currentEditionFig && currentEditionFig.type === "Polygon") {
                geometry = {
                    type: "MultiPolygon",
                    coordinates: [currentEditionFig.coordinates]
                };
            }

            // Convertir Polygon en MultiPolygon
            /*if (geometry && geometry.type === "Polygon") {
                geometry = {
                    type: "MultiPolygon",
                    coordinates: [geometry.coordinates]
                };
            }*/

            const url = `${API_URL}${datas[0]}/`;
            const data = {
                "geom": geometry,
                "departement": dept,
                "maire": maire,
                "superficie": area,
                "nom": name
            }

            const refreshDatas = await refreshAccess(url, RequestType.PATCH, data);

            let response = null;
            if(refreshDatas.response) response = refreshDatas.response;
            else {
                const token = refreshDatas.token;
                response = await axios.patch(url, data, { headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, withCredentials: true });
            }

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