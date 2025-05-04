import CardTable from "../Cards/CardTable";

const RestaurantsYaoundeFontPointTable = () => {
    
    const headRow = [ "Id", "Nom", "Téléphone", "Boite postale",  "Quartier", "Standing", "Commune" ];

    const datasRows = [
        [ 1, "AAA", "697542323", "public", "Melen", "Standing", "Commune" ],
        [ 2, "BBB", "687542323", "privé", "Melen", "Standing", "Commune" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/restaurants"
                headRow={headRow}
                datasRows={datasRows}
            />
        </>
    );
}

export default RestaurantsYaoundeFontPointTable;