import CardTable from "../Cards/CardTable";

const LaveriesPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Adresse", "Quartier", "Standing"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125", "Melen"],
        [ 2, "BBB", "687542323", "367125", "Melen"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/laveries"
                headRow={headRow}
                datasRows={datasRows}
                title="Laveries"
            />
        </>
    );
}

export default LaveriesPointTable;