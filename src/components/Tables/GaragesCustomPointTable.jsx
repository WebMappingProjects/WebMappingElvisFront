import { useEffect, useState } from "react";
import { useAppMainContext } from "../../context/AppProvider";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const GaragesCustomPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier", "Standing" ];

    const [ datasRows, setDatasRows ] = useState([]);
        
        useEffect(() => {
            const loadDatasRows = async () => {
            
                  try
                  {
                    const token = localStorage.getItem("token");
        
                    const response = await axios.get(`/gis/garages-custom?search=${dataSearch}`, {
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
                            data.properties.nom,
                            data.properties.telephone,
                            data.properties.postale,
                            data.properties.quartier,
                            data.properties.standing
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
                mainRoute="/admin/forms/garages-custom"
                headRow={headRow}
                datasRows={datasRows}
                title="Garages custom"
            />
        </>
    );
}

export default GaragesCustomPointTable;