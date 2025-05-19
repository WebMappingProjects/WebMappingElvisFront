import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const GendarmeriesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "numero", "Denomination", "Boite Postale", "Numero Telephone", "Specialisation", "Perimetre", "Localisation"];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/gendarmeries?search=${dataSearch}`, {
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
                        data.properties.numero,
                        data.properties.d_nominati,
                        data.properties.bo_te_post,
                        data.properties.num_ro_t_l,
                        data.properties.sp_cialisa,
                        data.properties.p_rim_tre_,
                        data.properties.localisati
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
                mainRoute="/admin/forms/gendarmeries"
                headRow={headRow}
                datasRows={datasRows}
                title="Gendarmeries"
            />
        </>
    );
}

export default GendarmeriesPointTable;