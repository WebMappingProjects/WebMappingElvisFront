import CardTable from "../Cards/CardTable";

const AgencesdeVoyagesPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Quartier", "Arrondissement"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125"],
        [ 2, "BBB", "687542323", "367125"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/agences-de-voyages"
                headRow={headRow}
                datasRows={datasRows}
                title="Agences de Voyages"
            />
        </>
    );
}

export default AgencesdeVoyagesPointTable;