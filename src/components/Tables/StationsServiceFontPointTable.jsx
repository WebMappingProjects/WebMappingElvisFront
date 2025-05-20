import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const StationsServiceFontPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "nom", "Adresse", "Telephone", "Quartier",  "Arrondissement"];

    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/stations-sevices-font?search=${dataSearch}`, {
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
                        data.properties.telephonni,
                        data.properties.quartier,
                        data.properties.arrondisse
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
                mainRoute="/admin/forms/stations-services"
                headRow={headRow}
                datasRows={datasRows}
                title="Stations services"
                coordsRows={coordsRows}
                apiRoute="/gis/stations-sevices-font/"
                originalEpsg={4326}
            />
        </>
    );
}

export default StationsServiceFontPointTable;