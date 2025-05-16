import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const BoulangeriesCustomPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Quartier", "Arrondissement", "Standing", "Telephone", "Boite postale", "Proprietaire" ];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("/gis/boulangeries-custom", {
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
                        data.properties.quartier,
                        data.properties.arrondisse,
                        data.properties.standing,
                        data.properties.t_l_phone,
                        data.properties.postale,
                        data.properties.propri_tai
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
                mainRoute="/admin/forms/boulangeries"
                headRow={headRow}
                datasRows={datasRows}
                title="Boulangeries"
            />
        </>
    );
}

export default BoulangeriesCustomPointTable;