import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import { getCorrectId } from "../../utils/tools";

const API_URL = "/gis/routes";

const EntityRoadTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Longueur (m)", "Type route", "Région" ];


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
                        getCorrectId(data.properties.id, data.id),
                        data.properties.nom,
                        data.properties.longueur,
                        data.properties.type,
                        [ data.properties.region_nom, data.properties.region ]
                    ];
                    
                    if(data.geometry != null && data.geometry != undefined)
                    {
                        cDatasRows.push(data.geometry);
                    }

                    returnDatas.push(tb);
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
                mainRoute="/admin/forms/entities/routes"
                headRow={headRow}
                datasRows={datasRows}
                title="Routes"
                geomType="LineString"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default EntityRoadTable;