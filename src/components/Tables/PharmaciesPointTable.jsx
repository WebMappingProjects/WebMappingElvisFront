import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const PharmaciesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

const headRow = [ "N°", "Numero", "Nom", "Localisation", "Pharmacien", "Téléphone", "Boite postale",  "Quartier", "Arrondissement", "Ouverture" ];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/pharmacies?search=${dataSearch}`, {
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
                        data.properties.noms,
                        data.properties.localisati,
                        data.properties.pharmacien,
                        data.properties.t_l_phone,
                        data.properties.bo_te_post,
                        data.properties.quartier,
                        data.properties.arrondisse,
                        data.properties.ouverture
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
                mainRoute="/admin/forms/pharmacies"
                headRow={headRow}
                datasRows={datasRows}
                title="Pharmacies"
            />
        </>
    );
}

export default PharmaciesPointTable;