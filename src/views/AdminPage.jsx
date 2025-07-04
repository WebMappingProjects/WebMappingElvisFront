import { useEffect, useState } from "react";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";
import { FaPen, FaTrash, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import axios from "../api/axios";
import SimpleMessagePopup from "../components/popups/SimpleMessagePopup";
import ErrorMessagePopup from "../components/popups/ErrorMessagePopup";
import ConfirmMessagePopup from "../components/popups/ConfirmMessagePopup";

const API_URL = "/auth/users";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "lambda", password: "" });
  const [editUser, setEditUser] = useState({ username: "", email: "", role: "lambda" });
  const [showAdd, setShowAdd] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [ messagePopupVisible, setMessagePopupVisible ] = useState(false);
  const [ errorPopupMessage, setErrorPopupMessage ] = useState("");
  const [ errorPopupVisible, setErrorPopupVisible ] = useState(false);
  const [ confirmPopupVisible, setConfirmPopupVisible ] = useState(false);

  const [ currentItemIndex, setCurrentItemIndex ] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      //console.log("FETCH USERS", res);
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
  };

  const handleAddUser = async () => {
    try {
      if(confirmPassword == newUser.password)
      {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/`, newUser, { headers: { Authorization: `Bearer ${token}` } });
        //console.log("RESPONSE ADDING USER", response);
        
        const newUserId = response.data.id;
  
        // Change user role
        if(newUser.role != "lambda")
        {
          await axios.post(`${API_URL}/${newUserId}/change-role/`, { "role": newUser.role }, { headers: { Authorization: `Bearer ${token}` } })
        }
  
        setShowAdd(false);
        setNewUser({ username: "", email: "", role: "lambda", password: "" });
        setConfirmPassword("");
        setMessagePopupVisible(true);
      } else {
        setErrorPopupMessage("Erreur : Les mots de passe ne correspondent pas !");
        setErrorPopupVisible(true);
      }
    } catch (err) {
      setErrorPopupMessage("Erreur : Echec de l'operation");
      setErrorPopupVisible(true);
      console.log("ERROR", err);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setConfirmPopupVisible(false);
      const id = currentItemIndex;
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMessagePopupVisible(true);
    } catch (err) {
      console.log("ERROR", err);
      setErrorPopupVisible(true);
    }
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUser({ username: user.username, email: user.email, role: user.role });
  };

  const handleSaveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(`${API_URL}/${id}/`, editUser, { headers: { Authorization: `Bearer ${token}` } });
      const editedUserId = response.data.id;

      // Change user role
      await axios.post(`${API_URL}/${editedUserId}/change-role/`, { "role": editUser.role }, { headers: { Authorization: `Bearer ${token}` } })
      setEditUserId(null);
      setMessagePopupVisible(true);
      //fetchUsers();
    } catch (err) {
      console.log("ERROR", err);
      setErrorPopupVisible(true);
      //alert("Erreur lors de la modification");
    }
  };

  return (
    <>
      <SimpleMessagePopup message="Operation effectuee avec succes" onClose={() => { setMessagePopupVisible(false); fetchUsers(); }} open={messagePopupVisible} />
      <ErrorMessagePopup message={errorPopupMessage} onClose={() => { setErrorPopupVisible(false); }} open={errorPopupVisible} />
      <ConfirmMessagePopup onConfirm={(e) => handleDeleteUser(e)} onCancel={() => setConfirmPopupVisible(false)} open={confirmPopupVisible} />

      <Navbar transparent />
      <main className="min-h-screen px-3 py-10 bg-primary-default">
        <div className="max-w-4xl p-8 mx-auto mt-24 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary-dark">Gestion des utilisateurs</h2>
            <button
              className="flex items-center gap-2 px-4 py-2 text-white rounded cursor-pointer bg-primary-default hover:bg-primary-dark"
              onClick={() => setShowAdd(!showAdd)}
            >
              <FaPlus /> Ajouter
            </button>
          </div>
          {showAdd && (
            <div className="flex flex-col w-full gap-2 mb-6">
              <div className="flex flex-col justify-center flex-1 w-full mb-4">
                <label className="mb-2">Nom d&apos;utilisateur :</label>
                <input
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Nom utilisateur"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>

              <div className="flex flex-col justify-center flex-1 w-full mb-4">
                <label className="mb-2">Email :</label>
                <input
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col justify-center flex-1 w-full mb-4">
                <label className="mb-2">Type d&apos;utilisateur :</label>

                <select className="w-full px-3 py-1 border rounded" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                  <option value="admin">Administrateur</option>
                  <option value="technicien">Technicien</option>
                  <option value="decideur">Decideur</option>
                  <option value="lambda">Utilisateur lambda</option>
                </select>
              </div>

              <div className="flex flex-col justify-center flex-1 w-full mb-4">
                <label className="mb-2">Mot de passe :</label>
                <input
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Mot de passe"
                  type="password"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>

              <div className="flex flex-col justify-center flex-1 w-full mb-4">
                <label className="mb-2">Confirmer le mot de passe :</label>
                <input
                  className="w-full px-3 py-1 border rounded"
                  placeholder="Confirmer le mot de passe"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <button className="ml-2 mr-4 text-2xl text-green-500 cursor-pointer" onClick={handleAddUser} title="Ajouter">
                  <FaCheck />
                </button>
                <button className="ml-1 text-2xl text-red-500 cursor-pointer" onClick={() => setShowAdd(false)} title="Annuler">
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
          <table className="w-full text-left border-t">
            <thead>
              <tr className="border-b text-primary-dark">
                <th className="px-3 py-2">Nom</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-primary-light-op">
                  <td className="px-3 py-2">
                    {editUserId === user.id ? (
                      <input
                        className="w-full px-2 py-1 border rounded"
                        value={editUser.username}
                        onChange={e => setEditUser({ ...editUser, username: e.target.value })}
                      />
                    ) : (
                      user.username
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editUserId === user.id ? (
                      <input
                        className="w-full px-2 py-1 border rounded"
                        value={editUser.email}
                        onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="py-2">
                    {editUserId === user.id ? (
                      <select className="w-full px-2 py-1 border rounded" 
                        value={editUser.role}
                        onChange={e => setEditUser({ ...editUser, role: e.target.value })}
                      >
                          <option value="admin">Administrateur</option>
                          <option value="technicien">Technicien</option>
                          <option value="decideur">Decideur</option>
                          <option value="lambda">Utilisateur lambda</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="flex justify-center gap-2 py-2 text-center">
                    {editUserId === user.id ? (
                      <>
                        <button className="text-xl text-green-500 cursor-pointer" onClick={() => handleSaveEdit(user.id)} title="Sauvegarder">
                          <FaCheck />
                        </button>
                        <button className="text-xl text-red-500 cursor-pointer" onClick={() => setEditUserId(null)} title="Annuler">
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="px-2 py-2 mr-4 text-xl rounded-md cursor-pointer text-primary-default bg-primary-light-op hover:bg-primary-default-op" onClick={() => handleEditUser(user)} title="Modifier">
                          <FaPen />
                        </button>
                      <button className="text-xl text-red-500 cursor-pointer" onClick={() => { setConfirmPopupVisible(true); setCurrentItemIndex(user.id)}} title="Supprimer">
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-lg font-bold text-center text-primary-default-op">Aucun utilisateur</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
