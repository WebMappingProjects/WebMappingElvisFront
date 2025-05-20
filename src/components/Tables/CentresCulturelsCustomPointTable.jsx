import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const API_URL = "/gis/centres-culturels-custom"
const CentresCulturelsCustomPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Quartier", "Promoteur",  "Telephone", "Email", "Boite Postale", "Offres", "Commune" ];

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
                        data.properties.quartier,
                        data.properties.promoteur,
                        data.properties.t_l_phone,
                        data.properties.e_mail,
                        data.properties.postale,
                        data.properties.offerts,
                        data.properties.communes
                    ];

                    let c = null;
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
                mainRoute="/admin/forms/centres-culturels"
                headRow={headRow}
                datasRows={datasRows}
                title="Centres culturels"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />
        </>
    );
}

export default CentresCulturelsCustomPointTable;