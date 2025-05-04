import CardTable from "../Cards/CardTable";

const StationsServiceFontPointTable = () => {
    
    const headRow = [ "Id", "nom", "Adresse", "Telephone", "Quartier",  "Arrondissement"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125", "Melen", "Spec Test" ],
        [ 2, "BBB", "687542323", "367125", "Melen", "Spec Test" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/stations-services"
                headRow={headRow}
                datasRows={datasRows}
            />
        </>
    );
}

export default StationsServiceFontPointTable;