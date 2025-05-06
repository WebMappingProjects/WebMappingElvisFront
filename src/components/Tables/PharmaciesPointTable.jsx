import CardTable from "../Cards/CardTable";

const PharmaciesPointTable = () => {
    
    const headRow = [ "Id", "Numero", "Nom", "Localisation", "Pharmacien", "Téléphone", "Boite postale",  "Quartier", "Arrondissement", "Ouverture" ];

    const datasRows = [
        [ 1, "Numero", "Nom", "Localisation", "Pharmacien", "Téléphone", "Boite postale",  "Quartier", "Arrondissement", "Ouverture"],
        [ 2, "Numero", "Nom", "Localisation", "Pharmacien", "Téléphone", "Boite postale",  "Quartier", "Arrondissement", "Ouverture"]
    ]


    return (
        <>
            <CardTable 
                color="light"
                mainRoute="/admin/forms/pharmacies"
                headRow={headRow}
                datasRows={datasRows}
                title="Pharmacies"
            />
        </>
    );
}

export default PharmaciesPointTable;