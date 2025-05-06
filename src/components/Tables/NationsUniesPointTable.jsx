import CardTable from "../Cards/CardTable";

const NationsUniesPointTable = () => {
    
    const headRow = [ "Id", "Nom", "Telephone", "Postale", "Quartier"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125", "Melen"],
        [ 2, "BBB", "687542323", "367125", "Melen"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/nations-unies"
                headRow={headRow}
                datasRows={datasRows}
                title="Nations unies"
            />
        </>
    );
}

export default NationsUniesPointTable;