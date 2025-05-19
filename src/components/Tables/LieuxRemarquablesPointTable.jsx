import { useEffect, useState } from "react";
import axios from "../../api/axios";
import CardTable from "../Cards/CardTable";

const LieuxRemarquablesPointTable = () => {
    
    const headRow = [ "N°", "Descriptio", "Nom"];

    const [ datasRows, setDatasRows ] = useState([]);
                    
        useEffect(() => {
            const loadDatasRows = async () => {
            
                    try
                    {
                    const token = localStorage.getItem("token");
        
                    const response = await axios.get("/gis/lieux-remarquables", {
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
                            data.properties.descriptio,
                            data.properties.nom
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
                mainRoute="/admin/forms/lieux-remarquables"
                headRow={headRow}
                datasRows={datasRows}
                title="lieux remarquables"
            />  
        </>
    );
}

export default LieuxRemarquablesPointTable;