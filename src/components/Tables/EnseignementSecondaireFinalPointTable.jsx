import CardTable from "../Cards/CardTable";

const EnseignementSecondaireFinalPointTable = () => {
    
    const headRow = [ "Id", "Numero", "Etablissement", "Localisation", "Fondateur", "Contact",  "Quartier" ];

    const datasRows = [
        [ 1, "AAA", "697542323", "public", "Melen", "Commune", "Quarter"],
        [ 2, "BBB", "687542323", "privé", "Melen", "Commune", "Quarter"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/ens-sec"
                headRow={headRow}
                datasRows={datasRows}
            />
        </>
    );
}

export default EnseignementSecondaireFinalPointTable;