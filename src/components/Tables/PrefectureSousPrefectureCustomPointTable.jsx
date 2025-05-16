import CardTable from "../Cards/CardTable";

const PrefectureSousPrefectureCustomPointTable = () => {
    
    const headRow = [ "N°", "Numero", "Nom", "Quartier" ];

    const datasRows = [
        [ 1, "Num", "Nom", "Quartier" ],
        [ 2, "Num", "Nom", "Quartier" ],
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/prefectures-sous-prefectures"
                headRow={headRow}
                datasRows={datasRows}
                title="Prefectures/Sous-prefectures"
            />
        </>
    );
}

export default PrefectureSousPrefectureCustomPointTable;