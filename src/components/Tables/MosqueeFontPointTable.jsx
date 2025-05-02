import CardTable from "../Cards/CardTable";

const MosqueeFontPointTable = () => {
    
    const headRow = [ "Id", "Nom", "Telephone", "Postale", "Quartier", "Religion", "Categorie"];

    const datasRows = [
        [ 1, "AAA", "697542323", "367125", "Melen", "Musulmane", "D7"]
    ]

    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/mosquee"
                headRow={headRow}
                datasRows={datasRows}
            />
        </>
    );
}

export default MosqueeFontPointTable;