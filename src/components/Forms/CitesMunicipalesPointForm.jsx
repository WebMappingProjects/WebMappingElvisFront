import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import { convertCoords } from "../../utils/tools";
import ErrorMessagePopup from "../popups/ErrorMessagePopup";

const API_URL = `/gis/cites-municipales-cuy/`;

const CitesMunicipalesPointForm = ()  => {

        const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ numero, setNumero ] = useState("");
    const [ designation, setDesignation ] = useState("");
    const [ sup, setSup ] = useState("");
    const [ estimee, setEstimee ] = useState("");
    const [ ageUtile, setAgeUtile ] = useState("");
    const [ actualisee, setActualisee ] = useState("");
    const [ neufAuM, setNeufAuM ] = useState("");
    const [ actualisee2, setActualisee2 ] = useState("");
    const [ unknowVar, setUnknowVar ] = useState("");
    const [ observatri, setObservatri ] = useState("");
    const [ quartier, setQuartier ] = useState("");

    const { currentEditionPoint, currentProjectionSystem } = useAppMainContext();

    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
    const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);

    useEffect(() => {
        if(datas != null)
        {
            setNumero(datas[1])
            setDesignation(datas[2])
            setSup(datas[3])
            setEstimee(datas[4])
            setAgeUtile(datas[5])
            setActualisee(datas[6])
            setNeufAuM(datas[7])
            setActualisee2(datas[8])
            setUnknowVar(datas[9]);
            setObservatri(datas[10])
            setQuartier(datas[11])
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
                "n_": numero,
                "designatio": designation,
                "sup": parseInt(sup),
                "extim_e_": parseInt(estimee),
                "age_utile": parseInt(ageUtile),
                "actualisee": parseInt(actualisee),
                "neuf_au_m_": parseInt(neufAuM),
                "actualis_e": parseInt(actualisee2),
                "__": parseInt(unknowVar),
                "observatri": observatri,
                "quartier": quartier,
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
                "n_": numero,
                "designatio": designation,
                "sup": parseInt(sup),
                "extim_e_": parseInt(estimee),
                "age_utile": parseInt(ageUtile),
                "actualisee": parseInt(actualisee),
                "neuf_au_m_": parseInt(neufAuM),
                "actualis_e": parseInt(actualisee2),
                "__": parseInt(unknowVar),
                "observatri": observatri,
                "quartier": quartier,
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
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Cites municipales</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour cite municipale
                </div>
                <form>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="num"
                        >
                            Numero
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Numero"
                            id="num"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="name"
                        >
                            Designation
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Nom"
                            id="name"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>


                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="sup"
                        >
                            Sup
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Sup"
                            id="sup"
                            value={sup}
                            onChange={(e) => setSup(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="age_utile"
                        >
                            age utile
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Age utile"
                            id="age_utile"
                            value={ageUtile}
                            onChange={(e) => setAgeUtile(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="actualisee"
                        >
                            Actualisee
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Actualisee"
                            id="actualisee"
                            value={actualisee}
                            onChange={(e) => setActualisee(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="neuf_au_m"
                        >
                            Neuf au m
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Neuf au m"
                            id="neuf_au_m"
                            value={neufAuM}
                            onChange={(e) => setNeufAuM(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="actualisee"
                        >
                            Actualisee
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Actualisee"
                            id="actualisee"
                            value={actualisee2}
                            onChange={(e) => setActualisee2(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="unknow"
                        >
                            ___
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="___"
                            id="unknow"
                            value={unknowVar}
                            onChange={(e) => setUnknowVar(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="obs"
                        >
                            Observatrice
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Observatrice"
                            id="obs"
                            value={observatri}
                            onChange={(e) => setObservatri(e.target.value)}
                        />
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                            className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                            htmlFor="quarter"
                        >
                            Quartier
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Quartier"
                            id="quarter"
                            value={quartier}
                            onChange={(e) => setQuartier(e.target.value)}
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

export default CitesMunicipalesPointForm;