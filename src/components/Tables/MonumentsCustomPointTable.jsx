import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const MonumentsCustomPointTable = () => {
    
    const headRow = [ "N°", "Numero", "Monument", "Position", "Creation",  "Signification"];

    const [ datasRows, setDatasRows ] = useState([]);

    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("/gis/monuments", {
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
                        data.properties.num,
                        data.properties.monument,
                        data.properties.position,
                        data.properties.creation,
                        data.properties.significat
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
                mainRoute="/admin/forms/monuments"
                headRow={headRow}
                datasRows={datasRows}
                title="Monuments"
            />
        </>
    );
}

export default MonumentsCustomPointTable;