import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import axios from "../../api/axios";
import { convertCoords, getValueFromIdx, refreshAccess, RequestType } from "../../utils/tools";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";
import Selections from "../Forms_blocks/Selections";

const API_URL = `/gis/services-publiques/`;

const typeService = [
    [ "BANQUE", "banque" ],
    [ "BOULANGERIE", "boulangerie" ],
    [ "BOUTIQUE", "boutique" ],
    [ "CENTRE_CULTUREL", "centre_culturel" ],
    [ "RESTAURANT", "restaurant" ],
    //[ "STATION_SERVICE", "" ],
    [ "AUTRE", "autres" ]
];

const ServicesPubliquesForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ type, setType ] = useState(typeService[0][1]);

    const [ reg, setReg ] = useState("");
    const [ dept, setDept ] = useState("");
    const [ com, setCom ] = useState("");

    const { currentEditionPoint, currentProjectionSystem } = useAppMainContext();

    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
    const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);

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

    const handleSave = async (e) => {
        e.preventDefault();

        try
        {
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

            const url = API_URL;
            const data = {
                "nom": name,
                "type": type,
                "commune": com,
                "geom": geometry
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

        try
        {
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
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Service publique</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour le service publique
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
                            htmlFor="typeService"
                        >
                            Type de service
                        </label>
                        <select
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="typeService"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {typeService.map((t) => (
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

export default ServicesPubliquesForm;