import CardTable from "../Cards/CardTable";

const CommissariatsYdePointTable = () => {
    
    const headRow = [ "N°", "numero", "Nom", "Localisation", "Numero Telephone", "Commissariat", "Quartier", "Arrondissement"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125", "Melen", "Spec Test", "Test Peri", "Test Loc"],
        [ 2, "BBB", "687542323", "367125", "Melen", "Spec Test", "Test Peri", "Test Loc"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/commissariats"
                headRow={headRow}
                datasRows={datasRows}
                title="Commissariats"
            />
        </>
    );
}

export default CommissariatsYdePointTable;