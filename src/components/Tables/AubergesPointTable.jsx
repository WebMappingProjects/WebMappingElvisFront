import { useAppMainContext } from "../../context/AppProvider";
import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const AubergesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Adresse", "Telephone",  "Quartier", "Arrondissement" ];

    const [ datasRows, setDatasRows ] = useState([]);
                    
        useEffect(() => {
            const loadDatasRows = async () => {
            
                    try
                    {
                    const token = localStorage.getItem("token");
        
                    const response = await axios.get("/gis/auberges-custom", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
            
                    const datas = response.data;
    
                    let returnDatas = [];
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
    
                        returnDatas.push(tb);
                    }
    
                    setDatasRows(returnDatas);
                    } catch (err) {
                    console.log("ERROR", err);
                    }
            }
    
            loadDatasRows();
        }, []);


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/auberges"
                headRow={headRow}
                datasRows={datasRows}
                title="Auberges"
            />
        </>
    );
}

export default AubergesPointTable;