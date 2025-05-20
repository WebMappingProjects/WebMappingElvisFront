import { useLocation, useNavigate } from "react-router-dom";
import Actions from "../Forms_blocks/Actions";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import SimpleMessagePopup from "../popups/SimpleMessagePopup";
import { ensureEPSG4326 } from "../../utils/tools";

const API_URL = `/gis/lieux-remarquables/`;

const LieuxRemarquablesPointForm = ()  => {

    const location = useLocation();
    const { datas } = location.state || "";
    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");

    const { currentEditionPoint } = useAppMainContext();

    const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);

    useEffect(() => {
        if(datas != null)
        {
            setName(datas[2]);
            setDescription(datas[1]);
        }
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        try
        {
            const token = localStorage.getItem("token");

            const epsg4326Coords = currentEditionPoint ? ensureEPSG4326(currentEditionPoint).coords : null;
            const geometry = epsg4326Coords
            ? {
                type: "Point",
                coordinates: [
                    epsg4326Coords[1],
                    epsg4326Coords[0]
                ]
            }
            : null;

            const response = await axios.post(API_URL, {
                "nom": name,
                "descriptio": description,
                "geom": geometry
            }, { headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }});

            console.log("RESPONSE", response);
            setMessagePopupVisible(true);
        } catch (e) {
            console.error("ERROR", e);
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        try
        {
            const token = localStorage.getItem("token");

            const epsg4326Coords = currentEditionPoint ? ensureEPSG4326(currentEditionPoint).coords : null;
            const geometry = epsg4326Coords
            ? {
                type: "Point",
                coordinates: [
                    epsg4326Coords[1],
                    epsg4326Coords[0]
                ]
            }
            : null;

            const response = await axios.patch(`${API_URL}${datas[0]}`, {
                "nom": name,
                "descriptio": description,
                "geom": geometry
            }, { headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }});

            console.log("RESPONSE", response);
            setMessagePopupVisible(true);
        } catch (e) {
            console.error("ERROR", e);
        }
    }

    return (
        <>
            <SimpleMessagePopup message="Operation effectuee avec succes" onClose={() => { setMessagePopupVisible(false); navigate(-1); }} open={messagePopupVisible} />
            <div className="relative flex-auto px-4 py-10 rounded shadow lg:px-10 bg-neutral-200">
                <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Gestion des lieux remarquables</h1>
                <div className="mt-4 mb-3 text-center text-primary-dark">
                    Veuillez specifier les informations pour le lieux
                </div>
                <form>
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
                            htmlFor="desc"
                        >
                            Description
                        </label>
                        <textarea
                            className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                            placeholder="Description"
                            id="desc"
                            maxLength="14"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        > </textarea>
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

export default LieuxRemarquablesPointForm;