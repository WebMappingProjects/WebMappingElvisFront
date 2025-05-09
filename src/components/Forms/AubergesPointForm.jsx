import Actions from "../Forms_blocks/Actions";

const AubergesPointForm = ()  => {

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
            <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Auberges</h1>
            <div className="mt-4 mb-3 text-center text-primary-dark">
                Veuillez specifier les informations pour auberges
            </div>
            <form>
                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="name"
                    >
                        Nom
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Nom"
                        id="name"
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
                        type="text"
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
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Téléphone"
                        id="tel"
                    />
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
                        placeholder="Quartier"
                        id="quarter"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="arr"
                    >
                        Arrondissement
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Arrondissement"
                        id="arr"
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

export default AubergesPointForm;