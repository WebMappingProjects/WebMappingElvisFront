import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios, { API_COMMUNE_URL } from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import { getCorrectId } from "../../utils/tools";

const API_URL = "/gis/projets";

const EntityProjectTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom contractant", "Description", "Montant", "Date debut", "Date livraison", "Type de service", "Commune", "Département", "Région" ];


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
                for(let i = 0; i < datas.length; i++)
                {
                    let data = datas[i];
                    
                    const response2 = await axios.get(`${API_COMMUNE_URL}/${data.commune}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    let tb = [
                        data.id,
                        data.nom_contractant,
                        data.description,
                        data.montant,
                        data.date_debut,
                        data.date_livraison,
                        data.service,
                        [ data.commune_nom, data.commune ],
                        [ response2?.data.properties.departement.properties.nom, response2?.data.properties.departement.id ],
                        [ response2?.data.properties.departement.properties.region_nom, response2?.data.properties.departement.properties.region ],

                    ];

                    returnDatas.push(tb);
                    //cDatasRows.push(c);
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
                mainRoute="/admin/forms/projets"
                headRow={headRow}
                datasRows={datasRows}
                title="Projets"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default EntityProjectTable;