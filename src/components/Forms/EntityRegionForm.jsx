import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import axios from "../../api/axios";
import { convertCoords, refreshAccess, RequestType } from "../../utils/tools";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";

const API_URL = `/gis/regions/`;

const EntityRegionForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ area, setArea ] = useState(0);

    const { currentEditionPoint, currentProjectionSystem,
        currentEditionFig
     } = useAppMainContext();

    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
    const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);

    useEffect(() => {
        if(datas != null)
        {
            setName(datas[1]);
            setArea(datas[2]);
        }
    }, []);

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

            const url = API_URL;
            const data = {
                "geom": geometry,
                "nom": name,
                "superficie": area
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
            }

            // Convertir Polygon en MultiPolygon
            if (geometry && geometry.type === "Polygon") {
                geometry = {
                    type: "MultiPolygon",
                    coordinates: [geometry.coordinates]
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

            const url = `${API_URL}${datas[0]}/`;
            const data = {
                "geom": geometry,
                "nom": name,
                "superficie": area
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
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Région</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour la région
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
                            Superficie (m²)
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Superficie"
                            id="area"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                        />
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

export default EntityRegionForm;