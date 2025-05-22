import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import { convertCoords } from "../../utils/tools";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";

const API_URL = `/gis/commissariats-yde-font/`;

const CommissariatsYdePointForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ numero, setNumero ] = useState("");
    const [ name, setName ] = useState("");
    const [ localisation, setLocalisation ] = useState("");
    const [ contact, setContact ] = useState("");
    const [ commissariat, setCommissariat ] = useState("");
    const [ quartier, setQuartier ] = useState("");
    const [ arrondissement, setArrondissement ] = useState("");

    const { currentEditionPoint, currentProjectionSystem } = useAppMainContext();

    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
    const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);

    useEffect(() => {
        if(datas != null)
        {
            setNumero(datas[1]);
            setName(datas[2]);
            setLocalisation(datas[3]);
            setContact(datas[4]);
            setCommissariat(datas[5]);
            setQuartier(datas[6]);
            setArrondissement(datas[7]);
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
                "num_ro": numero,
                "nom": name,
                "localisati": localisation,
                "contact": contact,
                "commissari": commissariat,
                "quartier": quartier,
                "arrondisse": arrondissement,
                "geom": geometry
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

            const response = await axios.patch(`${API_URL}${datas[0]}`, {
                "num_ro": numero,
                "nom": name,
                "localisati": localisation,
                "contact": contact,
                "commissari": commissariat,
                "quartier": quartier,
                "arrondisse": arrondissement,
                "geom": geometry
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
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Commissariats</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour le Commissariats
                </div>
                <form>
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="number"
                        >
                            Numero
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Numero"
                            id="number"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="name"
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
                            htmlFor="commissariat"
                        >
                            Commissariat
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Commissariat"
                            id="commissariat"
                            value={commissariat}
                            onChange={(e) => setCommissariat(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="tel"
                        >
                            Téléphone
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Téléphone"
                            id="tel"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="quartier"
                        >
                            Quartier
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Quartier"
                            id="quartier"
                            value={quartier}
                            onChange={(e) => setQuartier(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="arrond"
                        >
                            Arrondissement
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Arrondissement"
                            id="arrond"
                            value={arrondissement}
                            onChange={(e) => setArrondissement(e.target.value)}
                        />
                    </div>
                    
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="location"
                        >
                            Localisation
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Localisation"
                            id="location"
                            value={localisation}
                            onChange={(e) => setLocalisation(e.target.value)}
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

export default CommissariatsYdePointForm;