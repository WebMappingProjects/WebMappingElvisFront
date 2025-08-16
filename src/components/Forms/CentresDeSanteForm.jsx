import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import axios, { API_COMMUNE_URL, API_DEPARTEMENTS_URL, API_REGIONS_URL } from "../../api/axios";
import { convertCoords, getValueFromIdx, refreshAccess, RequestType } from "../../utils/tools";
import { useAppMainContext } from "../../context/AppProvider";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";
import Selections from "../Forms_blocks/Selections";

const API_URL = `/gis/centres-sante/`;

const CentresDeSanteForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ type, setType ] = useState("");
    const [ reg, setReg ] = useState("");
    const [ dept, setDept ] = useState("");
    const [ com, setCom ] = useState("");

    const { currentEditionPoint, currentProjectionSystem } = useAppMainContext();

    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
    const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);
    
    //const token = localStorage.getItem("token");

    const typeCentre = [
        [ "Centre de sante", "centre_sante"],
        [ "clinique", "clinique"],
        [ "Hopital d'arrondissement", "hopital_arrondissement"],
        [ "Hopital regional", "hopital_regional"],
        [ "Hopital de district", "hopital_district"],
        [ "Pharmacie", "pharmacie"]
    ];


    useEffect(() => {
        if(datas != null)
        {
            setName(getValueFromIdx(datas, 1));
            setType(getValueFromIdx(datas, 2));
            setCom(getValueFromIdx(datas, 3));
            setDept(getValueFromIdx(datas, 4));
            setReg(getValueFromIdx(datas, 5));
        }
    }, []);

    const handleSave = async (e) =>  {
        e.preventDefault();

        try {
            console.log("CURRENT EDITION BTN", currentEditionPoint);
            const returnToOriginalCoordSys = currentEditionPoint ? 
                (currentProjectionSystem == 4326 ? currentEditionPoint : convertCoords(currentEditionPoint).coords)
                    : null;
            
            const geometry = returnToOriginalCoordSys
            ? {
                type: "Point",
                coordinates: [
                    returnToOriginalCoordSys[1],
                    returnToOriginalCoordSys[0]
                ]
            }
            : null;

            console.log("GEOM", geometry);
            
            const data = {
                "geom": geometry,
                "nom": name,
                "type": type,
                "commune": com
            };

            const refreshDatas = await refreshAccess(API_URL, RequestType.POST, data);
            
            let response = null;
            if(refreshDatas.response) response = refreshDatas.response;
            else {
                const token = refreshDatas.token;
                response = await axios.post(API_URL, data, { headers: {
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

            const returnToOriginalCoordSys = currentEditionPoint ? 
                (currentProjectionSystem == 4326 ? currentEditionPoint : convertCoords(currentEditionPoint).coords)
                    : null;
            
            const geometry = returnToOriginalCoordSys
            ? {
                type: "Point",
                coordinates: [
                    returnToOriginalCoordSys[1],
                    returnToOriginalCoordSys[0]
                ]
            }
            : null;

            const url = `${API_URL}${datas[0]}/`;
            const data = {
                "geom": geometry,
                "nom": name,
                "type": type,
                "commune": com
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
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Structure de sante</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour la structure de sante
                </div>
                <form>
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="
                            name"
                        >
                            Nom
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Nom"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="typeCentre"
                        >
                            Type de structure
                        </label>
                        <select
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="typeCentre"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Sélectionner un type</option>
                            {typeCentre.map((t) => (
                                <option key={t[1]} value={t[1]}>{t[0]}</option>
                            ))}
                        </select>
                    </div>
                    
                    <Selections 
                        reg={reg}
                        setReg={setReg}
                        dept={dept}
                        setDept={setDept}
                        com={com}
                        setCom={setCom}
                    />

                    <Actions
                        handleSave={handleSave}
                        handleEdit={handleEdit}
                    />
                </form>
            </div>
        </>
    );
}

export default CentresDeSanteForm;