import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const EcolesMatPrimairePointTable = () => {
    
    const headRow = [ "N°", "Code", "Nom", "Téléphone", "Boîte postale",  "Quartier", "Arrondissement" ];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("/gis/ecoles-mat-primaire", {
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
                        data.properties.code_ecole,
                        data.properties.nom,
                        data.properties.telephone,
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
                mainRoute="/admin/forms/ecoles-mat-prim"
                headRow={headRow}
                datasRows={datasRows}
                title="Ecoles maternelles et primaires"
            />
        </>
    );
}

export default EcolesMatPrimairePointTable;