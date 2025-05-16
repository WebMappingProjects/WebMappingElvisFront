import CardTable from "../Cards/CardTable";

const ComplexSportifCustomPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Type", "Quartier", "Discipline",  "Commune", "Standing" ];

    const datasRows = [
        [ 1, "AAA", "697542323", "public", "Melen", "Commune", "Standing"],
        [ 2, "BBB", "687542323", "privé", "Melen", "Commune", "Standing"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/complex-sportif"
                headRow={headRow}
                datasRows={datasRows}
                title="Complexes sportif"
            />
        </>
    );
}

export default ComplexSportifCustomPointTable;