import { useAppMainContext } from "../../context/AppProvider";
import CardTable from "../Cards/CardTable";

const MairiesYaoundePointTable = () => {
    
    const { dataSearch } = useAppMainContext();

    const headRow = [ "N°", "Numero", "Nom", "Quartier"];

    const datasRows = [
        [ 1, "697542323", "AAA", "Melen"],
        [ 2, "687542323", "BBB", "Melen"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/mairies-yaounde"
                headRow={headRow}
                datasRows={datasRows}
                title="Mairies Yaounde"
            />
        </>
    );
}

export default MairiesYaoundePointTable;