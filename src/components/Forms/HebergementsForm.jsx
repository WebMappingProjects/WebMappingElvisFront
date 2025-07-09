import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import axios from "../../api/axios";
import { convertCoords, getValueFromIdx } from "../../utils/tools";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";
import Selections from "../Forms_blocks/Selections";

const API_URL = `/gis/hebergements/`;

const typeHebergement = [
    [ "HOTEL", "hotel" ],
    [ "AUBERGE", "auberge" ]
];

const standingsVals = [
    { option: "Pas d'étoile", nb: 0, val: "" },
    { option: "1 étoile", nb: 1, val: "*" },
    { option: "2 étoiles", nb: 2, val: "**" },
    { option: "3 étoiles", nb: 3, val: "***" },
    { option: "4 étoiles", nb: 4, val: "****" },
    { option: "5 étoiles", nb: 5, val: "*****" },
];

const HebergementsForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ rooms, setRooms ] = useState("");
    const [ type, setType ] = useState(typeHebergement[0][1]);
    const [ standing, setStanding ] = useState("");

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
            setRooms(getValueFromIdx(datas, 2));
            setType(getValueFromIdx(datas, 3));
            setStanding(getValueFromIdx(datas, 4));
            setCom(getValueFromIdx(datas, 5));
            setDept(getValueFromIdx(datas, 6));
            setReg(getValueFromIdx(datas, 7));
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

            const response = await axios.post(API_URL, {
                "nom": name,
                "nb_chambres": rooms,
                "type": type,
                "standing": standing,
                "geom": geometry,
                "commune": com
            }, { headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }});

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

            const response = await axios.patch(`${API_URL}${datas[0]}/`, {
                "nom": name,
                "nb_chambres": rooms,
                "type": type,
                "standing": standing,
                "geom": geometry,
                "commune": com
            }, { headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }});

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
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Hébergement</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour l&apos;hebergememnt
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
                            htmlFor="rooms"
                        >
                            Nombre de chambres
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Nombre de chambres"
                            id="rooms"
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                        />
                    </div>
                    

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="typeHebergement"
                        >
                            Type d&apos;hébergement
                        </label>
                        <select
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="typeHebergement"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {typeHebergement.map((t) => (
                                <option key={t[1]} value={t[1]}>{t[0]}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="standing"
                        >
                            Standing
                        </label>
                        <select
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="standing"
                            value={standing}
                            onChange={(e) => setStanding(e.target.value)}
                        >
                            {standingsVals.map((t) => (
                                <option key={t.nb} value={t.val}>{t.option}</option>
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

export default HebergementsForm;