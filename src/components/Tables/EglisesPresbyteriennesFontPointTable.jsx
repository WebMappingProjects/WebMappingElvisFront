import CardTable from "../Cards/CardTable";

const EglisesPresbyteriennesFontPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ];

    const datasRows = [
        [ 1, "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ],
        [ 2, "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/eglises-presbyteriennes"
                headRow={headRow}
                datasRows={datasRows}
                title="Eglises Presbyteriennes"
            />
        </>
    );
}

export default EglisesPresbyteriennesFontPointTable;