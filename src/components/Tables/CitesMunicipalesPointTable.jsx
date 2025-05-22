import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const API_URL = "/gis/cites-municipales-cuy";
const CitesMunicipalesPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Numero", "Designation", "Sup",  "Estimee", "Age utile", "Actualisee", "Neuf au m", "actualisee", "___", "observatrice", "quartier" ];

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
                mainRoute="/admin/forms/cites-municipales"
                headRow={headRow}
                datasRows={datasRows}
                title="Cites municipales"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default CitesMunicipalesPointTable;