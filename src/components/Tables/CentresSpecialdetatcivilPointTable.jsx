import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const CentresSpecialdEtatCivilPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "nom", "Quartier",  "Arrondissement"];
    
    const [ datasRows, setDatasRows ] = useState([]);
        
    useEffect(() => {
        const loadDatasRows = async () => {
        
                try
                {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/centre-special-detat-civil-font?search=${dataSearch}`, {
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
                mainRoute="/admin/forms/centres-special-detat-civil"
                headRow={headRow}
                datasRows={datasRows}
                title="Centres special d Etat civil"
            />
        </>
    );
}

export default CentresSpecialdEtatCivilPointTable;