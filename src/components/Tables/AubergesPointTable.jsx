import { useAppMainContext } from "../../context/AppProvider";
import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const API_URL = "/gis/auberges-custom";
const AubergesPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Adresse", "Telephone",  "Quartier", "Arrondissement" ];

    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);
                    
        useEffect(() => {
            const loadDatasRows = async () => {
            
                    try
                    {
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
                    for(let i = 0; i < datas.features.length; i++)
                    {
                        let data = datas.features[i];
                        
                        let tb = [
                            data.id,
                            data.properties.nom,
                            data.properties.adresse,
                            data.properties.telephonni,
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
                mainRoute="/admin/forms/auberges"
                headRow={headRow}
                datasRows={datasRows}
                title="Auberges"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default AubergesPointTable;