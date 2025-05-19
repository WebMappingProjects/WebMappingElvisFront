import { useEffect, useState } from "react";
import CardTable from "../Cards/CardTable";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

const ComplexSportifCustomPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Type", "Quartier", "Discipline",  "Commune", "Standing" ];

    const [ datasRows, setDatasRows ] = useState([]);
    
    useEffect(() => {
        const loadDatasRows = async () => {
        
              try
              {
                const token = localStorage.getItem("token");
    
                const response = await axios.get(`/gis/complexes-sportifs-custom?search=${dataSearch}`, {
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
                        data.properties.noms,
                        data.properties.type,
                        data.properties.quartier,
                        data.properties.discipline,
                        data.properties.commune,
                        data.properties.standing
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
                mainRoute="/admin/forms/complex-sportif"
                headRow={headRow}
                datasRows={datasRows}
                title="Complexes sportif"
            />
        </>
    );
}

export default ComplexSportifCustomPointTable;