import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const HotelsPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Boite postale", "Téléphone", "Quartier",  "Commune", "Restaurants", "Piscines", "Appartements", "Chambres", "Conferences", "Night club", "Suites", "Bars", "Golf", "Standing", "Tenis" ];

    const [ datasRows, setDatasRows ] = useState([]);

    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("/gis/hotels-font", {
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
                    ];

                    returnDatas.push(tb);
                }

                setDatasRows(returnDatas);
              } catch (err) {
                console.log("ERROR", err);
              }
        }

        loadDatasRows();
    }, []);

    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/hotels"
                headRow={headRow}
                datasRows={datasRows}
                title="Hotels"
            />
        </>
    );
}

export default HotelsPointTable;