import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const CentresCulturelsCustomPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Quartier", "Promoteur",  "Telephone", "Email", "Boite Postale", "Offres", "Commune" ];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("/gis/centres-culturels-custom", {
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
                        data.properties.promoteur,
                        data.properties.t_l_phone,
                        data.properties.e_mail,
                        data.properties.postale,
                        data.properties.offerts,
                        data.properties.communes
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
                mainRoute="/admin/forms/centres-culturels"
                headRow={headRow}
                datasRows={datasRows}
                title="Centres culturels"
            />
        </>
    );
}

export default CentresCulturelsCustomPointTable;