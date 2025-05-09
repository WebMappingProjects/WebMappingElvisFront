import CardTable from "../Cards/CardTable";

const AmbassadesPointTable = () => {
    
    const headRow = [ "Id", "Nom", "Telephone", "Postale", "Quartier" ];

    const datasRows = [
        [ 1, "Nom", "Telephone", "Postale", "Quartier" ],
        [ 2, "Nom", "Telephone", "Postale", "Quartier" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/ambassades"
                headRow={headRow}
                datasRows={datasRows}
                title="Ambassades"
            />
        </>
    );
}

export default AmbassadesPointTable;