import CardTable from "../Cards/CardTable";

const SapeurPompierPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Quartier", "Arrondissement"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125"],
        [ 2, "BBB", "687542323", "367125"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/sapeurpompier"
                headRow={headRow}
                datasRows={datasRows}
                title="Sapeurs pompier"
            />
        </>
    );
}

export default SapeurPompierPointTable;