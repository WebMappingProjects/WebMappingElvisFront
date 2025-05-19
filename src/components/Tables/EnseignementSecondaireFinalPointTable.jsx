import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const EnseignementSecondaireFinalPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Numero", "Etablissement", "Localisation", "Fondateur", "Contact",  "Quartier" ];

    const [ datasRows, setDatasRows ] = useState([]);

    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/enseignements-secondaires-final?search=${dataSearch}`, {
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
                        data.properties.etablissem,
                        data.properties.localisati,
                        data.properties.fondateur,
                        data.properties.contact,
                        data.properties.quartier
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
                mainRoute="/admin/forms/ens-sec"
                headRow={headRow}
                datasRows={datasRows}
                title="Enseignement secondaire"
            />
        </>
    );
}

export default EnseignementSecondaireFinalPointTable;