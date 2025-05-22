import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const PharmaciesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Numero", "Nom", "Localisation", "Pharmacien", "Téléphone", "Boite postale",  "Quartier", "Arrondissement", "Ouverture" ];

    const [ datasRows, setDatasRows ] = useState([]);
    const [ coordsRows, setCoordsRows ] = useState([]);
    
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
                let cDatasRows = [];
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

                    let c = [
                        data.geometry.coordinates[1],
                        data.geometry.coordinates[0]
                    ];

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
    }, [dataSearch]);


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/pharmacies"
                headRow={headRow}
                datasRows={datasRows}
                title="Pharmacies"
                coordsRows={coordsRows}
                apiRoute="/gis/pharmacies/"
                originalEpsg={4326}
            />
        </>
    );
}

export default PharmaciesPointTable;