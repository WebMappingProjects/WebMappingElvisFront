import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const API_URL = `/gis/eglises-presbyteriennes-font`;

const EglisesPresbyteriennesFontPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ];

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
                        data.properties.nom,
                        data.properties.telephone,
                        data.properties.postale,
                        data.properties.quartier,
                        data.properties.religion,
                        data.properties.categorie
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
    }, [dataSearch, reloadDatas]);


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/eglises-presbyteriennes"
                headRow={headRow}
                datasRows={datasRows}
                title="Eglises Presbyteriennes"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default EglisesPresbyteriennesFontPointTable;