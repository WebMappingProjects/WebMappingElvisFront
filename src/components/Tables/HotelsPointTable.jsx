import CardTable from "../Cards/CardTable";

const HotelsPointTable = () => {
    
    const headRow = [ "Id", "Nom", "Carte postale", "Téléphone", "Quartier",  "Commune", "Restaurants", "Piscines", "Appartements", "Chambres", "Conferences", "Night club", "Suites", "Bars", "Golf", "Standing", "Tenis" ];

    const datasRows = [
        [ 1, "Nom", "Carte postale", "Téléphone", "Quartier",  "Commune", "Restaurants", "Piscines", "Appartements", "Chambres", "Conferences", "Night club", "Suites", "Bars", "Golf", "Standing", "Tenis" ],
        [ 2, "Nom", "Carte postale", "Téléphone", "Quartier",  "Commune", "Restaurants", "Piscines", "Appartements", "Chambres", "Conferences", "Night club", "Suites", "Bars", "Golf", "Standing", "Tenis" ]
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/hotels"
                headRow={headRow}
                datasRows={datasRows}
                title="Hotels"
            />
        </>
    );
}

export default HotelsPointTable;