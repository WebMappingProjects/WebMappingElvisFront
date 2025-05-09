import CardTable from "../Cards/CardTable";

const CentresSpecialdEtatCivilPointTable = () => {
    
    const headRow = [ "Id", "nom", "Quartier",  "Arrondissement"];

    const datasRows = [
        [ 1, "AAA", "Melen", "Spec Test" ],
        [ 2, "BBB", "Melen", "Spec Test" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/centres-special-detat-civil"
                headRow={headRow}
                datasRows={datasRows}
                title="Centres special d Etat civil"
            />
        </>
    );
}

export default CentresSpecialdEtatCivilPointTable;