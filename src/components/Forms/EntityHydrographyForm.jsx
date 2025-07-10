import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import axios, { API_REGIONS_URL } from "../../api/axios";
import { convertCoords, getValueFromIdx } from "../../utils/tools";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";

const API_URL = `/gis/hydrographie/`;

const EntityHydrographyForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ distance, setDistance ] = useState(0);
    const [ reg, setReg ] = useState(0);

    const { currentEditionPoint, currentProjectionSystem,
        currentEditionFig
     } = useAppMainContext();
     
    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
    const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);

    const [ regions, setRegions ] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if(datas != null)
        {
            setName(getValueFromIdx(datas, 1));
            setDistance(getValueFromIdx(datas, 2));
            setReg(getValueFromIdx(datas, 3));
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
    
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            
            // Convertir LineString en MultiLineString pour correspondre au modèle Django
            let geometry = currentEditionFig;
            
            if (currentEditionFig && currentEditionFig.type === "LineString") {
                geometry = {
                    type: "MultiLineString",
                    coordinates: [currentEditionFig.coordinates]
                };
            }
            console.log("REG", reg);
            const response = await axios.post(API_URL, {
                "geom": geometry,
                "nom": name,
                "longueur": distance,
                "region": reg
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

            /*let geometry = currentEditionFig;
            
            if (currentEditionFig && currentProjectionSystem !== 4326) {
                // Conversion des coordonnées si nécessaire
                geometry = {
                    ...currentEditionFig,
                    coordinates: currentEditionFig.type === "LineString" 
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
            
            if (currentEditionFig && currentEditionFig.type === "LineString") {
                geometry = {
                    type: "MultiLineString",
                    coordinates: [currentEditionFig.coordinates]
                };
            }

            // Convertir Polygon en MultiLineString
            /*if (geometry && geometry.type === "LineString") {
                geometry = {
                    type: "MultiLineString",
                    coordinates: [geometry.coordinates]
                };
            }*/

            const response = await axios.patch(`${API_URL}${datas[0]}/`, {
                "geom": geometry,
                "nom": name,
                "longueur": distance,
                "region": reg
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
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Hydrographie</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour l&apos;hydrographie
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
                            htmlFor="distance"
                        >
                            Longueur (m)
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Longueur (m)"
                            id="distance"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
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

                    <Actions 
                        handleSave={handleSave}
                        handleEdit={handleEdit}
                    />
                </form>
            </div>
        </>
    );
}

export default EntityHydrographyForm;