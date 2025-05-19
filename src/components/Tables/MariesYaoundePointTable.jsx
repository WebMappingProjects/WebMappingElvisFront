import { useAppMainContext } from "../../context/AppProvider";
import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const MairiesYaoundePointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Numero", "Nom", "Quartier"];

    const [ datasRows, setDatasRows ] = useState([]);
        
        useEffect(() => {
            const loadDatasRows = async () => {
            
                  try
                  {
                    const token = localStorage.getItem("token");
        
                    const response = await axios.get("/gis/mairies-yaounde-custom", {
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
                            data.properties.quartier,

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
                mainRoute="/admin/forms/mairies-yaounde"
                headRow={headRow}
                datasRows={datasRows}
                title="Mairies Yaounde"
            />
        </>
    );
}

export default MairiesYaoundePointTable;