const BoulangeriesCustomPointForm = ()  => {
    return (
        <div className="relative flex-auto px-4 py-10 rounded shadow lg:px-10 bg-neutral-200">
            <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">Boulangeries</h1>
            <div className="mt-4 mb-3 text-center text-primary-dark">
                Veuillez specifier les informations specifiques a la boulangerie
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
                        htmlFor="arrond"
                    >
                        Arrondissement
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Arrondissement"
                        id="arrond"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="standing"
                    >
                        Standing
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Standing"
                        id="standing"
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
                        htmlFor="bp"
                    >
                        Boite postale
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Boite postale"
                        id="bp"
                    />
                </div>


                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="owner"
                    >
                        Proprietaire
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Proprietaire"
                        id="owner"
                    />
                </div>

                <div className="flex flex-col mt-6 text-center md:flex-row">
                    <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-black transition-all duration-150 ease-linear bg-green-300 rounded shadow outline-none cursor-pointer md:mx-3 hover:bg-green-500 hover:shadow-lg focus:outline-none"
                        type="button"
                    >
                        Confirmer les modifications
                    </button>

                    <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-black transition-all duration-150 ease-linear bg-red-300 rounded shadow outline-none cursor-pointer md:mx-3 hover:bg-red-500 hover:shadow-lg focus:outline-none"
                        type="button"
                    >
                        Annuler les modifications
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BoulangeriesCustomPointForm;