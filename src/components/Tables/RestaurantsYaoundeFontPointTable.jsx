import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const RestaurantsYaoundeFontPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Téléphone", "Boite postale",  "Quartier", "Standing", "Commune" ];

    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/restaurants-yaounde-font?search=${dataSearch}`, {
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
                        data.properties.t_lephone,
                        data.properties.postale,
                        data.properties.quartier,
                        data.properties.standing,
                        data.properties.commune
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
                mainRoute="/admin/forms/restaurants"
                headRow={headRow}
                datasRows={datasRows}
                title="Restaurants"
                coordsRows={coordsRows}
                apiRoute="/gis/restaurants-yaounde-font/"
                originalEpsg={4326}
            />
        </>
    );
}

export default RestaurantsYaoundeFontPointTable;