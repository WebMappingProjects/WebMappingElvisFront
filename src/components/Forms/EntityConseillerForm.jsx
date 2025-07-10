import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";
import { getValueFromIdx } from "../../utils/tools";
import Selections from "../Forms_blocks/Selections";

const API_URL = `gis/conseillers/`;

const ConseillerForm = () => {
    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [finMandat, setFinMandat] = useState("");
    const [role, setRole] = useState("");

    const [ reg, setReg ] = useState("");

    const [ regions, setRegions ] = useState([]);

    const [messagePopupVisible, setMessagePopupVisible] = useState(false);
    const [errorPopupVisible, setErrorPopupVisible] = useState(false);

    const token = localStorage.getItem("token");
     
    useEffect(() => {
        if (datas != null) {
            setNom(getValueFromIdx(datas, 1));
            setTelephone(getValueFromIdx(datas, 2));
            setFinMandat(getValueFromIdx(datas, 3));
            setRole(getValueFromIdx(datas, 4));

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
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(API_URL, {
                nom: nom,
                telephone: telephone,
                fin_mandat: finMandat,
                role: role,
                region: reg
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

            const response = await axios.patch(`${API_URL}${datas[0]}/`, {
                nom: nom,
                telephone: telephone,
                fin_mandat: finMandat,
                role: role,
                region: reg
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
            <SimpleMessagePopup 
                message="Opération effectuée avec succès" 
                onClose={() => { 
                    setMessagePopupVisible(false); 
                    navigate(-1); 
                }} 
                open={messagePopupVisible} 
            />
            <ErrorMessagePopup 
                message="ERREUR : Veuillez remplir tous les champs obligatoires" 
                onClose={() => { setErrorPopupVisible(false); }} 
                open={errorPopupVisible} 
            />
            
            <div className="relative flex-auto px-4 py-10 rounded shadow lg:px-10 bg-neutral-200">
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">
                    {datas ? "Modifier un conseiller" : "Ajouter un conseiller"}
                </h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez renseigner les informations du conseiller
                </div>
                
                <form>
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="nom"
                        >
                            Nom complet
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Nom et prénoms"
                            id="nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="telephone"
                        >
                            Téléphone
                        </label>
                        <input
                            type="tel"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Numéro de téléphone"
                            id="telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="finMandat"
                        >
                            Fin de mandat
                        </label>
                        <input
                            type="date"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="finMandat"
                            value={finMandat}
                            onChange={(e) => setFinMandat(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="role"
                        >
                            Rôle
                        </label>
                        <textarea
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >

                        </textarea>
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
                        hasDatas={datas != null}
                    />
                </form>
            </div>
        </>
    );
}

export default ConseillerForm;