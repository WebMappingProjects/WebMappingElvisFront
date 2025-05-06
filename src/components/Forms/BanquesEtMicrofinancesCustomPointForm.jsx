import Actions from "../Forms_blocks/Actions";

const BanquesEtMicrofinancesCustomPointForm = ()  => {

    const handleSave = (e) => {
        e.preventDefault();

        alert("saved succeed");
    }

    const handleEdit = (e) => {
        e.preventDefault();

        alert("edit succeed");
    }
    
    return (
        <div className="relative flex-auto px-4 py-10 rounded shadow lg:px-10 bg-neutral-200">
            <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Banques et Microfinances</h1>
            <div className="mt-4 mb-3 text-center text-primary-dark">
                Veuillez specifier les informations pour banque et microfinances
            </div>
            <form>
                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="nom"
                    >
                        Nom
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Nom"
                        id="nom"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="addr"
                    >
                        Adresse
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Adresse"
                        id="addr"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="tel"
                    >
                        Téléphone
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Téléphone"
                        id="tel"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="type"
                    >
                        Type
                    </label>
                    <select
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring" 
                        id="type">
                        <option value="Banque" defaultChecked >Banque</option>
                        <option value="Microfinance">Microfinance</option>
                    </select>
                </div>
                

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="quarter"
                    >
                        Quartier
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Commissariat"
                        id="quarter"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="arrondissement"
                    >
                        Arrondissement
                    </label>
                    <input
                        type="nom"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Commissariat"
                        id="arrondissement"
                    />
                </div>


                <Actions
                    handleSave={handleSave}
                    handleEdit={handleEdit}
                />
            </form>
        </div>
    );
}

export default BanquesEtMicrofinancesCustomPointForm;