import CardTable from "../Cards/CardTable";

const GendarmeriesPointTable = () => {
    
    const headRow = [ "Id", "numero", "Denomination", "Boite Postale", "Numero Telephone", "Specialisation", "Perimetre", "Localisation"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125", "Melen", "Spec Test", "Test Peri", "Test Loc"],
        [ 2, "BBB", "687542323", "367125", "Melen", "Spec Test", "Test Peri", "Test Loc"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/gendarmeries"
                headRow={headRow}
                datasRows={datasRows}
            />
        </>
    );
}

export default GendarmeriesPointTable;