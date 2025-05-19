import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const BouchesIncendiesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

const headRow = [ "N°", "Matricule", "Symbole"];

    const [ datasRows, setDatasRows ] = useState([]);
        
    useEffect(() => {
        const loadDatasRows = async () => {
        
                try
                {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/bouches-incendies-yde-custom?search=${dataSearch}`, {
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
                        data.properties.matricule,
                        data.properties.symbole
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
                mainRoute="/admin/forms/bouches-incendies"
                headRow={headRow}
                datasRows={datasRows}
                title="Bouches-Incendies"
            />
        </>
    );
}

export default BouchesIncendiesPointTable;