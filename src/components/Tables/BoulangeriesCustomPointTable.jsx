import CardTable from "../Cards/CardTable";

const BoulangeriesCustomPointTable = () => {
    
    const headRow = [ "Id", "Nom", "Quartier", "Arrondissement", "Standing", "Telephone", "Boite postale", "Proprietaire" ];

    const datasRows = [
        [ 1, "AAA", "Ngoa Ekelle", "Yde I", "Standing", "Tel", "BP", "Owner" ],
        [ 2, "BBB", "Ngoa Ekelle", "Yde I", "Standing", "Tel", "BP", "Owner" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/boulangeries"
                headRow={headRow}
                datasRows={datasRows}
            />
        </>
    );
}

export default BoulangeriesCustomPointTable;