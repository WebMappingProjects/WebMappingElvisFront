import CardTable from "../Cards/CardTable";

const SapeurPompierPointTable = () => {
    
    const headRow = [ "Id", "Nom", "Quartier", "Arrondissement"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125"],
        [ 2, "BBB", "687542323", "367125"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/agencesdevoyages"
                headRow={headRow}
                datasRows={datasRows}
                title="Agences de Voyages"
            />
        </>
    );
}

export default AgencesdeVoyagesPointTable;