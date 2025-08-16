import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios, { API_COMMUNE_URL } from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import { getCorrectId, refreshAccess, RequestType } from "../../utils/tools";

const API_URL = "/gis/hebergements"
const HebergementsTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Chambres", "Type", "Standing", "Commune", "Département", "Région"];


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
                    for(let i = 0; i < datas.features.length; i++)
                    {
                        let data = datas.features[i];
                        
                        const url = `${API_COMMUNE_URL}/${data.properties.commune}`;

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
    
                        const centerName = data.properties.nom;
    
                        let tb = [
                            getCorrectId(data.properties.id, data.id),
                            centerName,
                            data.properties.nb_chambres,
                            data.properties.type,
                            data.properties.standing,
                            [ data.properties.commune_nom, data.properties.commune ],
                            [ response2?.data.properties.departement.properties.nom, response2?.data.properties.departement.id ],
                            [ response2?.data.properties.departement.properties.region_nom, response2?.data.properties.departement.properties.region ],
                        ];

                        let c = null;
                        if(data.geometry != null && data.geometry != undefined)
                        {
                            c = [
                                data.geometry.coordinates[1],
                                data.geometry.coordinates[0]
                            ]
                        }

                        returnDatas.push(tb);
                        cDatasRows.push(c);
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
                mainRoute="/admin/forms/services/hebergement"
                headRow={headRow}
                datasRows={datasRows}
                title="Hébergements"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default HebergementsTable;