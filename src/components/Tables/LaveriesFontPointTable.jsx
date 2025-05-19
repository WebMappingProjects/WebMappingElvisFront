import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const LaveriesPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Adresse", "Quartier", "Standing"];

    
    const [ datasRows, setDatasRows ] = useState([]);
                    
        useEffect(() => {
            const loadDatasRows = async () => {
            
                    try
                    {
                    const token = localStorage.getItem("token");
        
                    const response = await axios.get("/gis/laveries-font", {
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
                            data.properties.quartier,
                            data.properties.standing
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
                mainRoute="/admin/forms/laveries"
                headRow={headRow}
                datasRows={datasRows}
                title="Laveries"
            />
        </>
    );
}

export default LaveriesPointTable;