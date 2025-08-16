import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios, { API_COMMUNE_URL } from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import { refreshAccess, RequestType } from "../../utils/tools";

const API_URL = "/gis/projets";

const EntityProjectTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom contractant", "Description", "Montant", "Date debut", "Date livraison", "Type de service", "Commune", "Département", "Région" ];


    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);

    useEffect(() => {
        const loadDatasRows = async () => {
        
                try
                {
                const token = localStorage.getItem("token");
    
                const url = `${API_URL}?search=${dataSearch}`;

                const refreshDatas = await refreshAccess(url, RequestType.GET);

                let response = null;
                if(refreshDatas.response) response = refreshDatas.response;
                else {
                    const token = refreshDatas.token;
                    response = await axios.get(url, { headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }, withCredentials: true });
                }
        
                const datas = response.data;

                let returnDatas = [];
                let cDatasRows = [];
                for(let i = 0; i < datas.length; i++)
                {
                    let data = datas[i];
                    
                    const url = `${API_COMMUNE_URL}/${data.commune}`;

                    const refreshDatas = await refreshAccess(url, RequestType.GET);

                    let response2 = null;
                    if(refreshDatas.response) response2 = refreshDatas.response;
                    else {
                        const token = refreshDatas.token;
                        response2 = await axios.get(url, { headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }, withCredentials: true });
                    }

                    let tb = [
                        data.id,
                        data.nom_contractant,
                        data.description,
                        data.montant,
                        data.date_debut,
                        data.date_livraison,
                        data.service,
                        [ data.commune_nom, data.commune ],
                        [ response2?.data.properties.departement.properties.nom, response2?.data.properties.departement.id ],
                        [ response2?.data.properties.departement.properties.region_nom, response2?.data.properties.departement.properties.region ],

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
                mainRoute="/admin/forms/projets"
                headRow={headRow}
                datasRows={datasRows}
                title="Projets"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default EntityProjectTable;