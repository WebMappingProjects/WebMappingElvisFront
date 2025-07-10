import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios, { API_COMMUNE_URL } from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const API_URL = "gis/conseillers";

const ConseillerTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Téléphone", "Fin de mandat", "Rôle", "Région" ];

    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);

    useEffect(() => {
        const loadDatasRows = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(`${API_URL}?search=${dataSearch}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
        
                const datas = response.data;

                let returnDatas = [];
                let cDatasRows = [];
                for(let i = 0; i < datas.length; i++)
                {
                    let data = datas[i];
                    

                    let tb = [
                        data.id,
                        data.nom,
                        data.telephone,
                        data.fin_mandat,
                        data.role,
                        [ data.region_nom, data.region ]
                    ];

                    returnDatas.push(tb);
                    //cDatasRows.push(c);
                }
                setDatasRows(returnDatas);
                setCoordsRows(cDatasRows);
            } catch (err) {
                console.log("ERROR", err);
            }
        }

        loadDatasRows();
    }, [dataSearch, reloadDatas]);

    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/conseillers"
                headRow={headRow}
                datasRows={datasRows}
                coordsRows={coordsRows}
                title="Liste des conseillers"
                apiRoute={`${API_URL}/`}
                hasCoords={false} // Pas de coordonnées géographiques pour les conseillers
            />
        </>
    );
}

export default ConseillerTable;