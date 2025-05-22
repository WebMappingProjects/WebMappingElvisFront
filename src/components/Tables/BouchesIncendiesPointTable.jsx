import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const API_URL = "/gis/bouches-incendies-yde-custom"

const BouchesIncendiesPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Matricule", "Symbole"];

    const [ datasRows, setDatasRows ] = useState([]);
         const [ coordsRows, setCoordsRows ] = useState([]);
   
    useEffect(() => {
        const loadDatasRows = async () => {
        
                try
                {
                const token = localStorage.getItem("token");
                
                const response = await axios.get(`${API_URL}?search=${dataSearch}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
        
                const datas = response.data;

                let returnDatas = [];                    
                let cDatasRows = [];

                for(let i = 0; i < datas.features.length; i++)
                {
                    let data = datas.features[i];
                    
                    let tb = [
                        data.id,
                        data.properties.matricule,
                        data.properties.symbole
                    ];

                    returnDatas.push(tb);                        
                    cDatasRows.push(tb);

                }

                setDatasRows(returnDatas);                    
                setCoordsRows(cDatasRows);

                } catch (err) {
                console.log("ERROR", err);
                }
        }

        loadDatasRows();
        }, [dataSearch, reloadDatas]);


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/bouches-incendies"
                headRow={headRow}
                datasRows={datasRows}                
                title="Bouches-Incendies"                
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}

            />
        </>
    );
}

export default BouchesIncendiesPointTable;