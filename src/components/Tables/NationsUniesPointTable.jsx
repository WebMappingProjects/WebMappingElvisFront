import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const NationsUniesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier"];

    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/nations-unies?search=${dataSearch}`, {
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
                        data.properties.telephone,
                        data.properties.postale,
                        data.properties.quartier
                    ];
                    let c = [
                        data.geometry.coordinates[1],
                        data.geometry.coordinates[0]
                    ];

                    returnDatas.push(tb);
                    cDatasRows.push(c);
                }

                setDatasRows(returnDatas);
                setCoordsRows(cDatasRows);
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
                mainRoute="/admin/forms/nations-unies"
                headRow={headRow}
                datasRows={datasRows}
                title="Nations unies"
                coordsRows={coordsRows}
                apiRoute="/gis/nations-unies/"
                originalEpsg={4326}
            />
        </>
    );
}

export default NationsUniesPointTable;