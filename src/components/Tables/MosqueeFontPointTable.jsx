import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const MosqueeFontPointTable = () => {
    
    const [ datasRows, setDatasRows ] = useState([]);

    const headRow = [ "Id", "Nom", "Telephone", "Postale", "Quartier", "Religion", "Categorie" ];
    
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
                
                console.log("DATAS", datas);

                let returnDatas = [];
                for(let i = 0; i < datas.features.length; i++)
                {
                    let data = datas.features[i];
                    
                    let tb = [
                        data.id,
                        data.properties.nom,
                        data.properties.telephonne,
                        data.properties.postale,
                        data.properties.quartier,
                        data.properties.religion,
                        data.properties.categorie
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
                mainRoute="/admin/forms/mosquee"
                headRow={headRow}
                datasRows={datasRows}
                title="Mosquees"
            />
        </>
    );
}

export default MosqueeFontPointTable;