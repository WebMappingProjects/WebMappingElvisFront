import CardTable from "../Cards/CardTable";

const GaragesCustomPointTable = () => {
    
    const headRow = [ "N°", "Nom", "Telephone", "Postale", "Quartier", "Standing" ];

    const datasRows = [
        [ 1, "AAA", "697542323", "public", "Melen", "Standing"],
        [ 2, "BBB", "687542323", "privé", "Melen",  "Standing"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/garages-custom"
                headRow={headRow}
                datasRows={datasRows}
                title="Garages custom"
            />
        </>
    );
}

export default GaragesCustomPointTable;