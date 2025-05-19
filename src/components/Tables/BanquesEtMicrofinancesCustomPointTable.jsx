import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const BanquesEtMicrofinancesCustomPointTable = () => {
    
    const headRow = [ "N°", "nom", "Adresse", "Telephone", "Quartier",  "Arrondissement"];

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
                        data.properties.adresse,
                        data.properties.telephoniq,
                        data.properties.type,
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
                mainRoute="/admin/forms/banques-microfinances"
                headRow={headRow}
                datasRows={datasRows}
                title="Banques et microfinances"
            />
        </>
    );
}

export default BanquesEtMicrofinancesCustomPointTable;