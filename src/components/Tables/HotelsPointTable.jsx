import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const API_URL = "/gis/hotels-font"
const HotelsPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Boite postale", "Téléphone", "Quartier",  "Commune", "Restaurants", "Piscines", "Appartements", "Chambres", "Conferences", "Night club", "Suites", "Bars", "Golf", "Standing", "Tenis" ];

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
                        data.properties.nom_h_tel,
                        data.properties.postale,
                        data.properties.telephone,
                        data.properties.quartier,
                        data.properties.commune,
                        data.properties.restaurant,
                        data.properties.piscine,
                        data.properties.appartemen,
                        data.properties.chambre,
                        data.properties.conf_rence,
                        data.properties.night_club,
                        data.properties.suites,
                        data.properties.bars,
                        data.properties.golf,
                        data.properties.standing,
                        data.properties.tenis,
                    ];let c = null;
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
                mainRoute="/admin/forms/hotels"
                headRow={headRow}
                datasRows={datasRows}
                title="Hotels"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default HotelsPointTable;