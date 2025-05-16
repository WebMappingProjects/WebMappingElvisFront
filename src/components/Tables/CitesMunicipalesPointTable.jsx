import CardTable from "../Cards/CardTable";

const CitesMunicipalesPointTable = () => {
    
    const headRow = [ "N°", "Numero", "Designation", "Sup",  "Estimee", "Age utile", "Actualisee", "Neuf au m", "actualisee", "___", "observatrice", "quartier" ];

    const datasRows = [
        [ 1, "Numero", "Designation", "Sup",  "Estimee", "Age utile", "Actualisee", "Neuf au m", "actualisee", "___", "observatrice", "quartier" ],
        [ 2, "Numero", "Designation", "Sup",  "Estimee", "Age utile", "Actualisee", "Neuf au m", "actualisee", "___", "observatrice", "quartier" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/cites-municipales"
                headRow={headRow}
                datasRows={datasRows}
                title="Cites municipales"
            />
        </>
    );
}

export default CitesMunicipalesPointTable;