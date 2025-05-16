import CardTable from "../Cards/CardTable";

const EcolesMatPrimairePointTable = () => {
    
    const headRow = [ "N°", "Code", "Nom", "Téléphone", "Boîte postale",  "Quartier", "Arrondissement" ];

    const datasRows = [
        [ 1, "AAA", "697542323", "public", "Melen", "Commune", "Standing"],
        [ 2, "BBB", "687542323", "privé", "Melen", "Commune", "Standing"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/ecoles-mat-prim"
                headRow={headRow}
                datasRows={datasRows}
                title="Ecoles maternelles et primaires"
            />
        </>
    );
}

export default EcolesMatPrimairePointTable;