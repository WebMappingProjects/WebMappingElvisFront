import { useEffect, useState } from "react";
import axios from "../../api/axios";
import CardTable from "../Cards/CardTable";
import { useAppMainContext } from "../../context/AppProvider";


const API_URL = "/gis/lieux-remarquables";
const LieuxRemarquablesPointTable = () => {
    
    const { dataSearch, reloadDatas } = useAppMainContext();

    const headRow = [ "N°", "Description", "Nom"];

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
                            data.properties.descriptio,
                            data.properties.nom
                        ];
                        
                        let c = [
                            data.geometry.coordinates[1],
                            data.geometry.coordinates[0]
                        ]

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
                mainRoute="/admin/forms/lieux-remarquables"
                headRow={headRow}
                datasRows={datasRows}
                title="lieux remarquables"
                coordsRows={coordsRows}
                apiRoute={`${API_URL}/`}
                originalEpsg={4326}
            />  
        </>
    );
}

export default LieuxRemarquablesPointTable;