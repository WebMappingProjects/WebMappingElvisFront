import { useEffect, useState } from "react";
import Footer from "../components/Footers/Footer";
import mountainImage from "../assets/mountain.avif";
import profileImage from "../assets/profile.avif";
import { FaCheck, FaPen, FaTimes, FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import axios from "../api/axios";
import { refreshAccess, RequestType } from "../utils/tools";
import Navbar from "../components/Navbars/IndexNavbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, useAnimation } from "framer-motion";

const API_URL = "/auth/users";

export default function Profile() {
  // États pour les champs et l'édition
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editField, setEditField] = useState(null);
  const [tempUsername, setTempUsername] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Initialisation
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    if (user) {
      setUserId(user.id);
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, []);

  // Fonctions de gestion
  const handleEdit = (field) => {
    setEditField(field);
    if (field === "username") setTempUsername(username);
    if (field === "email") setTempEmail(email);
    if (field === "password") {
      setCurrentPassword("")
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
    }
  };

  const handleCancel = () => setEditField(null);

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return false;
    }
    // .. Integrer la logique de validation de l'ancien mot de passe et changement
    setPasswordError("");
    return true;
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      if (editField === "password") {
        if (!validatePassword()) {
          setIsLoading(false);
          return;
        }
        // Logique pour changer le mot de passe
        // Vous devrez implémenter l'API correspondante
        toast.success("Mot de passe changé avec succès");
      } else {
        let savedDatas = null;
        if (editField === "username") {
          savedDatas = { username: tempUsername };
        }
        if (editField === "email") {
          savedDatas = { email: tempEmail };
        }

        if (savedDatas) {
          const url = `${API_URL}/${userId}/`;
          const data = savedDatas;

          const refreshDatas = await refreshAccess(url, RequestType.PATCH, data);
          let response = null;

          if (refreshDatas.response) {
            response = refreshDatas.response;
          } else {
            const token = refreshDatas.token;
            response = await axios.patch(url, data, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              withCredentials: true
            });
          }

          const user = JSON.parse(localStorage.getItem("authUser"));
          const updatedUser = { ...user, ...savedDatas };
          localStorage.setItem("authUser", JSON.stringify(updatedUser));

          setUsername(updatedUser.username);
          setEmail(updatedUser.email);
          
          toast.success("Modification effectuée avec succès");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Échec de la modification");
    } finally {
      setIsLoading(false);
      setEditField(null);
    }
  };

  return (
    <>
      <Navbar transparent />
      <main className="overflow-y-auto scroll-smooth">
        <section className="relative block h-[500px]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${mountainImage})`,
            }}
          >
            <span
              id="blackOverlay"
              className="absolute w-full h-full bg-black opacity-50"
            ></span>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current text-primary-default"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        
        <section className="relative py-16 bg-primary-default">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 mx-auto max-w-7xl">
            <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                    <div className="relative">
                      <img
                        alt="Profil utilisateur"
                        src={profileImage}
                        className="-m-16 -ml-20 align-middle border-none rounded-full shadow-xl w-60 h-60 lg:-ml-16 max-w-150-px object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-6 mt-20 text-center">
                  {/* Nom d'utilisateur */}
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-primary-default" />
                      <h3 className="text-lg font-semibold text-gray-600">Nom d'utilisateur</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {editField === "username" ? (
                        <>
                          <input
                            className="flex-1 px-3 py-2 text-lg border rounded focus:ring-2 focus:ring-primary-default focus:border-transparent"
                            value={tempUsername}
                            onChange={(e) => setTempUsername(e.target.value)}
                            autoFocus
                          />
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={handleSave}
                              className="p-1 text-2xl text-green-500 cursor-pointer hover:text-green-600"
                              title="Sauvegarder"
                              disabled={isLoading}
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-1 text-2xl text-red-500 cursor-pointer hover:text-red-600"
                              title="Annuler"
                              disabled={isLoading}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 px-3 py-2 text-xl text-left text-gray-800 bg-gray-100 rounded">
                            {username}
                          </span>
                          <button
                            onClick={() => handleEdit("username")}
                            className="p-1 ml-2 text-xl cursor-pointer text-primary-default hover:text-primary-dark"
                            title="Modifier le nom"
                          >
                            <FaPen />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-primary-default" />
                      <h3 className="text-lg font-semibold text-gray-600">Email</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {editField === "email" ? (
                        <>
                          <input
                            type="email"
                            className="flex-1 px-3 py-2 text-lg border rounded focus:ring-2 focus:ring-primary-default focus:border-transparent"
                            value={tempEmail}
                            onChange={(e) => setTempEmail(e.target.value)}
                            autoFocus
                          />
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={handleSave}
                              className="p-1 text-2xl text-green-500 cursor-pointer hover:text-green-600"
                              title="Sauvegarder"
                              disabled={isLoading}
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={handleCancel}
                              className="p-1 text-2xl text-red-500 cursor-pointer hover:text-red-600"
                              title="Annuler"
                              disabled={isLoading}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 px-3 py-2 text-xl text-left text-gray-800 bg-gray-100 rounded">
                            {email}
                          </span>
                          <button
                            onClick={() => handleEdit("email")}
                            className="p-1 ml-2 text-xl cursor-pointer text-primary-default hover:text-primary-dark"
                            title="Modifier l'email"
                          >
                            <FaPen />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mot de passe */}
                  <div className="w-full max-w-md">
                    <div className="flex items-center gap-2">
                      <FaLock className="text-primary-default" />
                      <h3 className="text-lg font-semibold text-gray-600">Mot de passe</h3>
                    </div>
                    <div className="mt-2">
                      {editField === "password" ? (
                        <div className="space-y-3">
                          <input
                            type="password"
                            className="w-full px-3 py-2 text-lg border rounded focus:ring-2 focus:ring-primary-default focus:border-transparent"
                            placeholder="Mot de passe actuel"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            autoFocus
                          />
                          <input
                            type="password"
                            className="w-full px-3 py-2 text-lg border rounded focus:ring-2 focus:ring-primary-default focus:border-transparent"
                            placeholder="Nouveau mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <input
                            type="password"
                            className="w-full px-3 py-2 text-lg border rounded focus:ring-2 focus:ring-primary-default focus:border-transparent"
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          {passwordError && (
                            <p className="text-sm text-red-500">{passwordError}</p>
                          )}
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleCancel}
                              className="px-4 cursor-pointer py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                              disabled={isLoading}
                            >
                              Annuler
                            </button>
                            <button
                              onClick={handleSave}
                              className="px-4 py-2 cursor-pointer text-white bg-primary-default rounded hover:bg-primary-dark"
                              disabled={isLoading}
                            >
                              {isLoading ? "En cours..." : "Enregistrer"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="flex-1 px-3 py-2 text-xl text-left text-gray-800 bg-gray-100 rounded">
                            ********
                          </span>
                          <button
                            onClick={() => handleEdit("password")}
                            className="p-1 ml-2 text-xl cursor-pointer text-primary-default hover:text-primary-dark"
                            title="Modifier le mot de passe"
                          >
                            <FaPen />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="py-10 mt-10 text-center border-t border-blueGray-200">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-9/12">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        Gérez vos informations personnelles et paramètres liés à l'application.
                      </p>
                      <button className="px-6 py-2 cursor-pointer text-white bg-red-500 rounded-lg hover:bg-red-600">
                        Supprimer mon compte
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}