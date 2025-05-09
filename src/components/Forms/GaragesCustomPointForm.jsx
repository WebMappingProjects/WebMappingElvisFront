import Actions from "../Forms_blocks/Actions";

const GaragesCustomPointForm = ()  => {

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
            <h1 className="text-lg font-bold text-center text-primary-default md:text-2xl">GaragesCustom</h1>
            <div className="mt-4 mb-3 text-center text-primary-dark">
                Veuillez specifier les informations pour le GaragesCustom
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
                        htmlFor="tel"
                    >
                        Telephone
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Telephone"
                        id="tel"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="postale"
                    >
                        Postale
                    </label>
                    <input
                        type="number"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Postale"
                        id="postale"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="quartier"
                    >
                        Quartier
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Quartier"
                        id="quartier"
                    />
                </div>

                <div className="relative w-full mb-3">
                    <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="stand"
                    >
                        Standing
                    </label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder:text-neutral-400 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Standing"
                        id="stand"
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

export default GaragesCustomPointForm;