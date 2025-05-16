import CardTable from "../Cards/CardTable";

const EnseignementSuperieurCustomPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Téléphone", "Fax",  "Quartier", "Arrondissement" ];

    const datasRows = [
        [ 1, "AAA", "697542323", "public", "Melen", "Commune"],
        [ 2, "BBB", "687542323", "privé", "Melen", "Commune"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/ens-sup"
                headRow={headRow}
                datasRows={datasRows}
                title="Enseignement superieur"
            />
        </>
    );
}

export default EnseignementSuperieurCustomPointTable;