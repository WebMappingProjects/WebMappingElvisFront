import CardTable from "../Cards/CardTable";

const LieuxRemarquablesPointTable = () => {
    
    const headRow = [ "Id", "Descriptio", "Nom"];

    const datasRows = [
        [ 1, "AAA", "697542323"],
        [ 2, "BBB", "687542323"],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/lieux-remarquables"
                headRow={headRow}
                datasRows={datasRows}
                title="lieux remarquables"
            />  
        </>
    );
}

export default LieuxRemarquablesPointTable;