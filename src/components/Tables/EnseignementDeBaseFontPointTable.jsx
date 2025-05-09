import CardTable from "../Cards/CardTable";

const EnseignementDeBaseFontPointTable = () => {
    
    const headRow = [ "Id", "Numero", "Nom", "Telephone", "Boite postale",  "Quartier", "Arrondissement" ];

    const datasRows = [
        [ 1, "Num", "Nom", "Telephone", "Boite postale",  "Quartier", "Arrondissement" ],
        [ 2, "Num", "Nom", "Telephone", "Boite postale",  "Quartier", "Arrondissement" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/enseignement-de-base"
                headRow={headRow}
                datasRows={datasRows}
                title="Enseignement de base"
            />
        </>
    );
}

export default EnseignementDeBaseFontPointTable;