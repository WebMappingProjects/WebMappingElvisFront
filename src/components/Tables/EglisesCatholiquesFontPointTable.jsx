import CardTable from "../Cards/CardTable";

const EglisesCatholiquesFontPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ];

    const datasRows = [
        [ 1, "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ],
        [ 2, "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/eglises-catholiques"
                headRow={headRow}
                datasRows={datasRows}
                title="Eglises Catholiques"
            />
        </>
    );
}

export default EglisesCatholiquesFontPointTable;