import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const CommissariatsYdePointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "numero", "Nom", "Localisation", "Numero Telephone", "Commissariat", "Quartier", "Arrondissement"];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/commissariats-yde-font?search=${dataSearch}`, {
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
                        data.properties.num_ro,
                        data.properties.nom,
                        data.properties.localisati,
                        data.properties.contact,
                        data.properties.commissari,
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
    }, [dataSearch]);


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/commissariats"
                headRow={headRow}
                datasRows={datasRows}
                title="Commissariats"
            />
        </>
    );
}

export default CommissariatsYdePointTable;