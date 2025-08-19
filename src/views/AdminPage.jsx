import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaPen, 
  FaTrash, 
  FaPlus, 
  FaCheck, 
  FaTimes,
  FaUserShield,
  FaUserCog,
  FaUserTie,
  FaUser,
  FaSearch
} from "react-icons/fa";
import axios from "../api/axios";
import SimpleMessagePopup from "../components/popups/SimpleMessagePopup";
import ErrorMessagePopup from "../components/popups/ErrorMessagePopup";
import ConfirmMessagePopup from "../components/popups/ConfirmMessagePopup";
import { refreshAccess, RequestType } from "../utils/tools";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/IndexNavbar";

const API_URL = "/auth/users";

const roleIcons = {
  admin: <FaUserShield className="text-purple-600" />,
  technicien: <FaUserCog className="text-blue-600" />,
  decideur: <FaUserTie className="text-green-600" />,
  lambda: <FaUser className="text-gray-600" />
};

const roleColors = {
  admin: "bg-purple-100 text-purple-800",
  technicien: "bg-blue-100 text-blue-800",
  decideur: "bg-green-100 text-green-800",
  lambda: "bg-gray-100 text-gray-800"
};

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [newUser, setNewUser] = useState({ 
    username: "", 
    email: "", 
    role: "lambda", 
    password: "" 
  });
  const [editUser, setEditUser] = useState({ 
    username: "", 
    email: "", 
    role: "lambda" 
  });
  const [showAdd, setShowAdd] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ userDataSearch, setUserDataSearch ] = useState("");

  const [messagePopupVisible, setMessagePopupVisible] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState("");
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [userDataSearch]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const url = `${API_URL}?search=${userDataSearch}`;
      const refreshDatas = await refreshAccess(url, RequestType.GET);
      let res = null;
      
      if(refreshDatas.response) {
        res = refreshDatas.response;
      } else {
        const token = refreshDatas.token;
        res = await axios.get(url, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
      }
      
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (confirmPassword !== newUser.password) {
      setErrorPopupMessage("Les mots de passe ne correspondent pas !");
      setErrorPopupVisible(true);
      return;
    }

    if (newUser.username.trim() == "" || newUser.email.trim() == "" || newUser.password.trim() == "") {
      setErrorPopupMessage("Erreur ! Tous les champs sont requis");
      setErrorPopupVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      const url = `${API_URL}/`;
      const data = newUser;

      const refreshDatas = await refreshAccess(url, RequestType.POST, data);
      let response = null;

      if(refreshDatas.response) {
        response = refreshDatas.response;
      } else {
        const token = refreshDatas.token;
        response = await axios.post(url, data, { 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }, 
          withCredentials: true 
        });
      }
      
      const newUserId = response.data.id;

      // Change user role if not lambda
      if(newUser.role !== "lambda") {
        await changeUserRole(newUserId, newUser.role);
      }

      setShowAdd(false);
      setNewUser({ username: "", email: "", role: "lambda", password: "" });
      setConfirmPassword("");
      setMessagePopupVisible(true);
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
      setErrorPopupMessage(err.response?.data?.message || "Erreur lors de l'ajout de l'utilisateur");
      setErrorPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const changeUserRole = async (userId, role) => {
    const url = `${API_URL}/${userId}/change-role/`;
    const data = { role };

    const refreshDatas = await refreshAccess(url, RequestType.POST, data);
    
    if(!refreshDatas.response) {
      const token = refreshDatas.token;
      await axios.post(url, data, { 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }, 
        withCredentials: true 
      });
    }
  };

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      setConfirmPopupVisible(false);
      const id = currentItemIndex;
      const url = `${API_URL}/${id}`;
              
      const refreshDatas = await refreshAccess(url, RequestType.DELETE);
      
      if(!refreshDatas.response) {
        const token = refreshDatas.token;
        await axios.delete(url, {
          headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        });
      }

      setMessagePopupVisible(true);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setErrorPopupMessage("Erreur lors de la suppression de l'utilisateur");
      setErrorPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUser({ 
      username: user.username, 
      email: user.email, 
      role: user.role 
    });
  };

  const handleSaveEdit = async (id) => {
    setIsLoading(true);
    try {
      const url = `${API_URL}/${id}/`;
      const data = editUser;

      const refreshDatas = await refreshAccess(url, RequestType.PATCH, data);
      let response = null;

      if(refreshDatas.response) {
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

      await changeUserRole(id, editUser.role);
      
      setEditUserId(null);
      setMessagePopupVisible(true);
      fetchUsers();
    } catch (err) {
      console.error("Error editing user:", err);
      setErrorPopupMessage("Erreur lors de la modification de l'utilisateur");
      setErrorPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <SimpleMessagePopup 
        message="Opération effectuée avec succès" 
        onClose={() => setMessagePopupVisible(false)} 
        open={messagePopupVisible} 
      />
      <ErrorMessagePopup 
        message={errorPopupMessage} 
        onClose={() => setErrorPopupVisible(false)} 
        open={errorPopupVisible} 
      />
      <ConfirmMessagePopup 
        message="Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
        onConfirm={handleDeleteUser} 
        onCancel={() => setConfirmPopupVisible(false)} 
        open={confirmPopupVisible} 
      />

      <main className="px-4 py-8 sm:px-6 lg:px-8 pt-24 bg-gradient-to-br from-blue-200 to-blue-300">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-8 flex-wrap">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
              <p className="mt-2 text-gray-600">
                Administrez les comptes utilisateurs et leurs permissions
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdd(!showAdd)}
              className="flex mt-3 md:mt-0 items-center cursor-pointer px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
            >
              <FaPlus />
              <span>Ajouter un utilisateur</span>
            </motion.button>
          </motion.div>

          {/* Add User Form */}
          <AnimatePresence>
            {showAdd && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 overflow-hidden bg-white rounded-lg shadow"
              >
                <div className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Nouvel Utilisateur</h2>
                  
                  <div className="grid gap-6 mb-6 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Nom d&apos;utilisateur
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.username}
                        onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Rôle
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      >
                        <option value="admin">Administrateur</option>
                        <option value="technicien">Technicien</option>
                        <option value="decideur">Décideur</option>
                        <option value="lambda">Utilisateur standard</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Confirmer le mot de passe
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => setShowAdd(false)}
                      className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Annuler
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleAddUser}
                      disabled={isLoading}
                      className={`px-4 py-2 cursor-pointer text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="search"
              placeholder="Entrer les informations a rechercher"
              className="py-2 pl-10 pr-4 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-800 my-4 bg-white w-full"
              value={userDataSearch}
              onChange={(e) => setUserDataSearch(e.target.value)}
            />
          </motion.div>

          {/* Users Table */}
          <motion.div variants={itemVariants} className="bg-white shadow overflow-hidden rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading && users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        Chargement...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        Aucun utilisateur trouvé
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <motion.tr 
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editUserId === user.id ? (
                            <input
                              type="text"
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={editUser.username}
                              onChange={e => setEditUser({ ...editUser, username: e.target.value })}
                            />
                          ) : (
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full">
                                {roleIcons[user.role]}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                <div className="text-sm text-gray-500">{user.role}</div>
                              </div>
                            </div>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editUserId === user.id ? (
                            <input
                              type="email"
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={editUser.email}
                              onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                            />
                          ) : (
                            <div className="text-sm text-gray-900">{user.email}</div>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editUserId === user.id ? (
                            <select
                              className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={editUser.role}
                              onChange={e => setEditUser({ ...editUser, role: e.target.value })}
                            >
                              <option value="admin">Administrateur</option>
                              <option value="technicien">Technicien</option>
                              <option value="decideur">Décideur</option>
                              <option value="lambda">Utilisateur standard</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role]}`}>
                              {user.role}
                            </span>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {editUserId === user.id ? (
                            <div className="flex justify-end space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleSaveEdit(user.id)}
                                disabled={isLoading}
                                className="p-1 text-green-600 hover:text-green-800"
                                title="Enregistrer"
                              >
                                <FaCheck />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setEditUserId(null)}
                                className="p-1 text-gray-600 hover:text-gray-800"
                                title="Annuler"
                              >
                                <FaTimes />
                              </motion.button>
                            </div>
                          ) : (
                            <div className="flex justify-end space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleEditUser(user)}
                                className="p-1 text-blue-600 hover:text-blue-800"
                                title="Modifier"
                              >
                                <FaPen />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  setConfirmPopupVisible(true);
                                  setCurrentItemIndex(user.id);
                                }}
                                className="p-1 text-red-600 hover:text-red-800"
                                title="Supprimer"
                              >
                                <FaTrash />
                              </motion.button>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}