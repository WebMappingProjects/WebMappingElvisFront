import { useEffect, useState } from "react";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";
import { FaPen, FaTrash, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import axios from "../api/axios";

const API_URL = "/auth/users";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const [editUser, setEditUser] = useState({ username: "", email: "" });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
  };

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(API_URL, newUser, { headers: { Authorization: `Bearer ${token}` } });
      setShowAdd(false);
      setNewUser({ username: "", email: "", password: "" });
      fetchUsers();
    } catch {
      alert("Erreur lors de l'ajout");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch {
      alert("Erreur lors de la suppression");
    }
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUser({ username: user.username, email: user.email });
  };

  const handleSaveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_URL}/${id}`, editUser, { headers: { Authorization: `Bearer ${token}` } });
      setEditUserId(null);
      fetchUsers();
    } catch {
      alert("Erreur lors de la modification");
    }
  };

  return (
    <>
      <Navbar transparent />
      <main className="min-h-screen py-10 bg-primary-default">
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

                <select className="w-full px-3 py-1 border rounded">
                  <option value="admin">Administrateur</option>
                  <option value="technicien">Technicien</option>
                  <option value="decideur">Decideur</option>
                  <option value="lambda" defaultChecked>Utilisateur lambda</option>
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
                  //value={newUser.password}
                  //onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>

              <div>
                <button className="ml-2 text-2xl text-green-500 cursor-pointer" onClick={handleAddUser} title="Ajouter">
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
              <tr className="text-blueGray-600">
                <th className="py-2">Nom</th>
                <th className="py-2">Email</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-blueGray-50">
                  <td className="py-2">
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
                  <td className="py-2">
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
                        <button className="text-xl cursor-pointer text-primary-default" onClick={() => handleEditUser(user)} title="Modifier">
                          <FaPen />
                        </button>
                        <button className="text-xl text-red-500 cursor-pointer" onClick={() => handleDeleteUser(user.id)} title="Supprimer">
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-blueGray-400">Aucun utilisateur</td>
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
