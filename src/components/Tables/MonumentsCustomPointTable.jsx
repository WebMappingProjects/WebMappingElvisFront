import CardTable from "../Cards/CardTable";

const MonumentsCustomPointTable = () => {
    
    const headRow = [ "Id", "Numero", "Monument", "Position", "Creation",  "Signification"];

    const datasRows = [
        [ 1, "Num", "Monument", "Position", "Creation",  "Signification" ],
        [ 2, "Num", "Monument", "Position", "Creation",  "Signification" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/monuments"
                headRow={headRow}
                datasRows={datasRows}
                title="Monuments"
            />
        </>
    );
}

export default MonumentsCustomPointTable;