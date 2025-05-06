import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Actions = ({ handleSave, handleEdit }) => {

    const location = useLocation();
    const { type } = location.state || "create";
    const navigate = useNavigate();


    const handleReturn = (e) => {
        e.preventDefault();

        navigate(-1);
    }

    return (
        <>
            {type == "create" ? (
                <div className="flex flex-col mt-6 text-center md:flex-row">
                    <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-black transition-all duration-150 ease-linear bg-green-300 rounded shadow outline-none cursor-pointer md:mx-3 hover:bg-green-500 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={handleSave}
                    >
                        Sauvegarder la nouvelle donnee
                    </button>
                    <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-black transition-all duration-150 ease-linear bg-red-300 rounded shadow outline-none cursor-pointer md:mx-3 hover:bg-red-500 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={handleReturn}
                    >
                        Annuler la sauvegarde
                    </button>
                </div>
            ) : (
                <div className="flex flex-col mt-6 text-center md:flex-row">
                    <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-black transition-all duration-150 ease-linear bg-green-300 rounded shadow outline-none cursor-pointer md:mx-3 hover:bg-green-500 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={handleEdit}
                    >
                        Confirmer les modifications
                    </button>
    
                    <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-black transition-all duration-150 ease-linear bg-red-300 rounded shadow outline-none cursor-pointer md:mx-3 hover:bg-red-500 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={handleReturn}
                    >
                        Annuler les modifications
                    </button>
                </div>
            )}
        </>
    );
}

Actions.propTypes = {
    handleSave: PropTypes.object,
    handleEdit: PropTypes.object
}

export default Actions;