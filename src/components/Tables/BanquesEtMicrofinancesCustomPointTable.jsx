import CardTable from "../Cards/CardTable";

const BanquesEtMicrofinancesCustomPointTable = () => {
    
    const headRow = [ "N°", "nom", "Adresse", "Telephone", "Quartier",  "Arrondissement"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125", "Melen", "Spec Test" ],
        [ 2, "BBB", "687542323", "367125", "Melen", "Spec Test" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/banques-microfinances"
                headRow={headRow}
                datasRows={datasRows}
                title="Banques et microfinances"
            />
        </>
    );
}

export default BanquesEtMicrofinancesCustomPointTable;