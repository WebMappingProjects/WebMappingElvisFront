import { useAppMainContext } from "../../context/AppProvider";
import CardTable from "../Cards/CardTable";

const BouchesIncendiesPointTable = () => {
    
    const { dataSearch } = useAppMainContext();

const headRow = [ "N°", "Matricule", "Symbole"];

    const datasRows = [
        [ 1, "AAA", "BP"],
        [ 2, "BBB", "BP"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/bouches-incendies"
                headRow={headRow}
                datasRows={datasRows}
                title="Bouches-Incendies"
            />
        </>
    );
}

export default BouchesIncendiesPointTable;