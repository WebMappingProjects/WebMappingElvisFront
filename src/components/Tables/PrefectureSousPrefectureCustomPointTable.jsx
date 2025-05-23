import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const PrefectureSousPrefectureCustomPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Numero", "Nom", "Quartier" ];

    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);

    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/prefectures-sous-prefectures-custom?search=${dataSearch}`, {
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
                        data.properties.numero,
                        data.properties.nom,
                        data.properties.quartier
                    ];

                    let c = null;
                        if(data.geometry != null && data.geometry != undefined)
                        {
                            c = [
                                data.geometry.coordinates[1],
                                data.geometry.coordinates[0]
                            ]
                        }

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
                mainRoute="/admin/forms/prefectures-sous-prefectures"
                headRow={headRow}
                datasRows={datasRows}
                title="Prefectures/Sous-prefectures"
                coordsRows={coordsRows}
                apiRoute="/gis/prefectures-sous-prefectures-custom/"
                originalEpsg={4326}
            />
        </>
    );
}

export default PrefectureSousPrefectureCustomPointTable;