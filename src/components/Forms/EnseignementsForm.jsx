import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import axios from "../../api/axios";
import { convertCoords, getValueFromIdx } from "../../utils/tools";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";
import Selections from "../Forms_blocks/Selections";

const API_URL = `/gis/enseignement/`;


const typeEtablissement = [
    [ "PUBLIC", "public" ],
    [ "PRIVEE LAIC", "prive_laic" ],
    [ "PRIVEE CONFESSIONNELLE", "prive_confessionnel" ] 
];

const typeFormation = [
    [ "ACADEMIQUE", "academique" ],
    [ "PROFESSIONNELLE", "professionnelle" ]
];

const typeEnseignement = [
    [ "BASE", "base" ],
    [ "SECONDAIRE", "secondaire" ],
    [ "SUPERIEUR", "superieur" ]
];

const typeReligion = [
    [ "CATHOLIQUE", "catholique" ],
    [ "PROTESTANTE", "protestante" ],
    [ "PRESBYTERIENNE", "adventiste" ],
    [ "ADVENTISTE", "musulmane" ],
    [ "MUSULMANE", "presbyterienne" ],
    [ "AUCUNE", "aucune" ]
];

const EnseignementsForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ respName, setRespName ] = useState("");
    const [ effectif, setEffectif ] = useState("");
    const [ etsType, setEtsType ] = useState(typeEtablissement[0][1]);
    const [ religion, setReligion ] = useState(typeReligion[0][1]);
    const [ ensType, setEnsType ] = useState(typeEnseignement[0][1]);
    const [ formationType, setFormationType ] = useState(typeFormation[0][1]);
    const [ bestGraduation, setBestGraduation ] = useState("");

    const [ reg, setReg ] = useState("");
    const [ dept, setDept ] = useState("");
    const [ com, setCom ] = useState("");

    const { currentEditionPoint, currentProjectionSystem } = useAppMainContext();

    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
    const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);

    useEffect(() => {
        console.log("ETS TYPE CHANGED", etsType);
    }, [etsType]);
    useEffect(() => {
        if(datas != null)
        {
            setName(getValueFromIdx(datas, 1));
            setRespName(getValueFromIdx(datas, 2));
            setEffectif(getValueFromIdx(datas, 3));
            setEtsType(getValueFromIdx(datas, 4));
            setReligion(getValueFromIdx(datas, 5));
            setEnsType(getValueFromIdx(datas, 6));
            setFormationType(getValueFromIdx(datas, 7));
            setBestGraduation(getValueFromIdx(datas, 8));
            setCom(getValueFromIdx(datas, 9));
            setDept(getValueFromIdx(datas, 10));
            setReg(getValueFromIdx(datas, 11));
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

            console.log("ETS TYPE", etsType);
            const response = await axios.post(API_URL, {
                "geom": geometry,
                "nom": name,
                "nom_responsable" : respName,
                "effectif" : effectif,
                "type" : etsType,
                "religion" : religion,
                "enseignement" : ensType,
                "formation" : formationType,
                "meilleur_diplome" : bestGraduation,
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
                "geom": geometry,
                "nom": name,
                "nom_responsable" : respName,
                "effectif" : effectif,
                "type" : etsType,
                "religion" : religion,
                "enseignement" : ensType,
                "formation" : formationType,
                "meilleur_diplome" : bestGraduation,
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
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Enseignement</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour l&apos;enseignement
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
                            htmlFor="respName"
                        >
                            Nom du responsable
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Nom du respondable"
                            id="respName"
                            value={respName}
                            onChange={(e) => setRespName(e.target.value)}
                        />
                    </div>
                    
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="effectif"
                        >
                            Effectif
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Effectif"
                            id="effectif"
                            value={effectif}
                            onChange={(e) => setEffectif(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="typeReligion"
                        >
                            Type d&apos;etablissement
                        </label>
                        <select
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="typeReligion"
                            value={etsType}
                            onChange={(e) => setEtsType(e.target.value)}
                        >
                            {typeEtablissement.map((t) => (
                                <option key={t[1]} value={t[1]}>{t[0]}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="typeReligion"
                        >
                            Type de religion
                        </label>
                        <select
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="typeReligion"
                            value={religion}
                            onChange={(e) => setReligion(e.target.value)}
                        >
                            {typeReligion.map((t) => (
                                <option key={t[1]} value={t[1]}>{t[0]}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="typeEnseignement"
                        >
                            Type d&apos;enseignement
                        </label>
                        <select
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="typeEnseignement"
                            value={ensType}
                            onChange={(e) => setEnsType(e.target.value)}
                        >
                            {typeEnseignement.map((t) => (
                                <option key={t[1]} value={t[1]}>{t[0]}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="typeFormation"
                        >
                            Type de formation
                        </label>
                        <select
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            id="typeFormation"
                            value={formationType}
                            onChange={(e) => setFormationType(e.target.value)}
                        >
                            {typeFormation.map((t) => (
                                <option key={t[1]} value={t[1]}>{t[0]}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="bestGraduation"
                        >
                            Meilleur diplôme
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Meilleur diplôme"
                            id="bestGraduation"
                            value={bestGraduation}
                            onChange={(e) => setBestGraduation(e.target.value)}
                        />
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

export default EnseignementsForm;