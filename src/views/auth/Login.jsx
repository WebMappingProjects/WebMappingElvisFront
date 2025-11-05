import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaEye, 
  FaEyeSlash,
  FaArrowRight,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Login() {
  const { setAuthUser } = useAppMainContext();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onIdentifierChange = (e) => {
    setIdentifier(e.target.value);
    setErrorMessage("");
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const datas = {
        "identifier": identifier,
        "password": password
      };

      const response = await axios.post("/auth/login/", datas, { 
        withCredentials: true
      });

      const token = response.data.access;
      const user = response.data.user;

      const authUser = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role
      };

      localStorage.setItem("token", token);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      setAuthUser(authUser);

      navigate("/");
      
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage(err.response?.data?.message || "Identifiants incorrects");
    } finally {
      setIsLoading(false);
    }
  }

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        {/* Carte principale */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* En-tête */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaUser className="w-12 h-12 mx-auto text-white p-2 bg-blue-700 rounded-full" />
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="mt-4 text-2xl font-bold text-white"
            >
              Connexion à MaKarte
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="mt-2 text-blue-100"
            >
              Accédez à votre portail géospatial
            </motion.p>
          </div>

          {/* Formulaire */}
          <div className="p-6 sm:p-8">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
              >
                {errorMessage}
              </motion.div>
            )}

            <form onSubmit={handleLogin}>
              <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom d&apos;utilisateur ou email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Entrez votre identifiant"
                    value={identifier}
                    onChange={onIdentifierChange}
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={onPasswordChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 cursor-pointer w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Se souvenir de moi
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`w-full flex cursor-pointer justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connexion en cours...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Se connecter <FaArrowRight className="ml-2" />
                    </span>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>

          {/* Pied de page */}
          {/* <motion.div 
            variants={itemVariants}
            className="px-6 py-4 bg-gray-50 text-center"
          >
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                S'inscrire
              </Link>
            </p>
          </motion.div> */}
        </motion.div>

        {/* Logo en bas */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <Link to="/" className="inline-flex items-center">
            <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-blue-800">
              Ma<span className="text-blue-600">Karte</span>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}