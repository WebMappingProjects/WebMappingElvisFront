import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const API_URL = "/gis/gendarmeries"
const GendarmeriesPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "numero", "Denomination", "Boite Postale", "Numero Telephone", "Specialisation", "Perimetre", "Localisation"];

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
                        data.properties.numero,
                        data.properties.d_nominati,
                        data.properties.bo_te_post,
                        data.properties.num_ro_t_l,
                        data.properties.sp_cialisa,
                        data.properties.p_rim_tre_,
                        data.properties.localisati
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
                mainRoute="/admin/forms/gendarmeries"
                headRow={headRow}
                datasRows={datasRows}
                title="Gendarmeries"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default GendarmeriesPointTable;