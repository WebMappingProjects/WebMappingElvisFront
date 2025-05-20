import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const MosqueeFontPointTable = () => {
    
    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);

    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier", "Religion", "Categorie" ];
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/mosquees-font?search=${dataSearch}`, {
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
                    
                    let lat = null;
                    let long = null;
                    if(data.geometry != null && data.geometry != undefined)
                    {
                        lat = data.geometry.coordinates[1];
                        long = data.geometry.coordinates[0];
                    }
                    
                    let tb = [
                        data.id,
                        data.properties.nom,
                        data.properties.telephonne,
                        data.properties.postale,
                        data.properties.quartier,
                        data.properties.religion,
                        data.properties.categorie
                    ];
                    let c = [lat, long];

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
    }, [dataSearch, reloadDatas]);

    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/mosquee"
                headRow={headRow}
                datasRows={datasRows}
                title="Mosquees"
                coordsRows={coordsRows}
                apiRoute="/gis/mosquees-font/"
                originalEpsg={4326}
            />
        </>
    );
}

export default MosqueeFontPointTable;