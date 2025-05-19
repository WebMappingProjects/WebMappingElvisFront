import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const EnseignementDeBaseFontPointTable = () => {
    
    const headRow = [ "N°", "Numero", "Nom", "Telephone", "Boite postale",  "Quartier", "Arrondissement" ];

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
                        data.properties.numero,
                        data.properties.nom,
                        data.properties.telephonne,
                        data.properties.bp,
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
                mainRoute="/admin/forms/enseignement-de-base"
                headRow={headRow}
                datasRows={datasRows}
                title="Enseignement de base"
            />
        </>
    );
}

export default EnseignementDeBaseFontPointTable;