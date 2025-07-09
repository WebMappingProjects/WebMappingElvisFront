import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios, { API_COMMUNE_URL } from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import { getCorrectId } from "../../utils/tools";

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
                        
                        const response2 = await axios.get(`${API_COMMUNE_URL}/${data.properties.commune}`, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });
    
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