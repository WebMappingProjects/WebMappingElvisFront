import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const API_URL = "/gis/banques-et-microfinances-custom;"

const BanquesEtMicrofinancesCustomPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "nom", "Adresse", "Telephone", "Quartier",  "Arrondissement"];

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
                        data.properties.nom,
                        data.properties.adresse,
                        data.properties.telephoniq,
                        data.properties.type,
                        data.properties.quartier,
                        data.properties.arrondisse
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
                mainRoute="/admin/forms/banques-microfinances"
                headRow={headRow}
                datasRows={datasRows}
                title="Banques et microfinances"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />                

        </>                
    );
}

export default BanquesEtMicrofinancesCustomPointTable;