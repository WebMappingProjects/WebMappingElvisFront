import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";

const CitesMunicipalesPointTable = () => {
    
    const headRow = [ "N°", "Numero", "Designation", "Sup",  "Estimee", "Age utile", "Actualisee", "Neuf au m", "actualisee", "___", "observatrice", "quartier" ];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get("/gis/cites-municipales-cuy", {
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
                        data.properties.n_,
                        data.properties.designatio,
                        data.properties.sup,
                        data.properties.estim_e__,
                        data.properties.age_utile,
                        data.properties.actualisee,
                        data.properties.neuf_au_m_,
                        data.properties.actualis_e,
                        data.properties.__,
                        data.properties.observatri,
                        data.properties.quartier,
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
                mainRoute="/admin/forms/cites-municipales"
                headRow={headRow}
                datasRows={datasRows}
                title="Cites municipales"
            />
        </>
    );
}

export default CitesMunicipalesPointTable;