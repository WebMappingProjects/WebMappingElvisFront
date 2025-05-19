import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const AgencesdeVoyagesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Quartier", "Arrondissement"];

    const [ datasRows, setDatasRows ] = useState([]);
                    
        useEffect(() => {
            const loadDatasRows = async () => {
            
                    try
                    {
                    const token = localStorage.getItem("token");
        
                    const response = await axios.get(`/gis/agences-de-voyages-font?search=${dataSearch}`, {
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
        }, [dataSearch]);

    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/agences-de-voyages"
                headRow={headRow}
                datasRows={datasRows}
                title="Agences de Voyages"
            />
        </>
    );
}

export default AgencesdeVoyagesPointTable;