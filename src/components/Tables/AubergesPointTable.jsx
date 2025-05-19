import { useAppMainContext } from "../../context/AppProvider";
import CardTable from "../Cards/CardTable";

const AubergesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Nom", "Adresse", "Telephone",  "Quartier", "Arrondissement" ];

    const datasRows = [
        [ 1, "AAA", "BP", "Tel","Ngoa Ekelle", "Yde I"],
        [ 2, "BBB", "BP", "Tel","Ngoa Ekelle", "Yde I" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/auberges"
                headRow={headRow}
                datasRows={datasRows}
                title="Auberges"
            />
        </>
    );
}

export default AubergesPointTable;