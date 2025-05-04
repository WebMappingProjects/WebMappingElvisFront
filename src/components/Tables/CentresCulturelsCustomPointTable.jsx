import CardTable from "../Cards/CardTable";

const CentresCulturelsCustomPointTable = () => {
    
    const headRow = [ "Id", "Nom", "Quartier", "Promoteur",  "Telephone", "Email", "Boite Postale", "Offres", "Commune" ];

    const datasRows = [
        [ 1, "AAA", "Quartier", "Promoteur",  "Telephone", "Email", "Boite Postale", "Offres", "Commune"],
        [ 2, "BBB", "Quartier", "Promoteur",  "Telephone", "Email", "Boite Postale", "Offres", "Commune"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/centres-culturels"
                headRow={headRow}
                datasRows={datasRows}
            />
        </>
    );
}

export default CentresCulturelsCustomPointTable;