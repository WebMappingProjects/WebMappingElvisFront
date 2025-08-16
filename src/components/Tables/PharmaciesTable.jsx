import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import { refreshAccess, RequestType } from "../../utils/tools";

const API_URL = "/gis/pharmacies"
const PharmaciesTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Nom du pharmacien", "Commune", "Département", "Région"];


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
                        
                        let tb = [
                            data.id,
                            data.properties.nom,
                            data.properties.quartier,
                            data.properties.arrondisse
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
                mainRoute="/admin/forms/services/pharmacies"
                headRow={headRow}
                datasRows={datasRows}
                title="Pharmacies"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default PharmaciesTable;