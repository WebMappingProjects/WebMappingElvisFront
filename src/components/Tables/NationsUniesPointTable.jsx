import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const NationsUniesPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier"];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("/gis/mosquees-font", {
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
                        data.properties.telephone,
                        data.properties.postale,
                        data.properties.quartier
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
                mainRoute="/admin/forms/nations-unies"
                headRow={headRow}
                datasRows={datasRows}
                title="Nations unies"
            />
        </>
    );
}

export default NationsUniesPointTable;