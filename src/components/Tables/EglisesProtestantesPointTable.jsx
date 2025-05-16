import CardTable from "../Cards/CardTable";

const EglisesProtestantesPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ];

    const datasRows = [
        [ 1, "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ],
        [ 2, "Nom", "Telephone", "Postale", "Quartier", "religion", "categorie" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/eglises-protestantes"
                headRow={headRow}
                datasRows={datasRows}
                title="Eglises Protestantes"
            />
        </>
    );
}

export default EglisesProtestantesPointTable;