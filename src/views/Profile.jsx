import { useEffect, useState } from "react";
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";
import mountainImage from "../assets/mountain.avif";
import profileImage from "../assets/profile.avif";
import { FaCheck, FaPen, FaTimes } from "react-icons/fa";
import axios from "../api/axios";

const API_URL = "/auth/users";
export default function Profile() {
  // États pour les champs et l'édition
  const [username, setUsername] = useState("Jenna Stones");
  const [email, setEmail] = useState("jenna.stones@email.com");
  const [editField, setEditField] = useState(null); // 'username', 'email', 'password' ou null
  const [tempUsername, setTempUsername] = useState(username);
  const [tempEmail, setTempEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Initialisation
  useEffect(() => {
    const usernameDt = localStorage.getItem("username");
    const emailDt = localStorage.getItem("email");

    setUsername(usernameDt);
    setEmail(emailDt);
  }, [])
  // Fonctions de gestion
  const handleEdit = (field) => {
    setEditField(field);
    if (field === "username") setTempUsername(username);
    if (field === "email") setTempEmail(email);
    if (field === "password") {
      setPassword("");
      setConfirmPassword("");
    }
  };
  const handleCancel = () => setEditField(null);
  const handleSave = async () => {
    if (editField === "username") {
      
        try
        {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            const response = await axios.patch(`${API_URL}/${userId}`, {
                "username": tempUsername
            }, { headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }});

            console.log("RESPONSE", response);
            localStorage.setItem("username", tempUsername);
            setUsername(tempUsername);
            alert("Modification effectuee avec success")
          } catch (e) {
            alert("Echec de la modification")
            console.error("ERROR", e);
        }
    }
    if (editField === "email"){
      try
      {
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
          const response = await axios.patch(`${API_URL}/${userId}`, {
              "email": tempEmail
          }, { headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }});

          console.log("RESPONSE", response);
          localStorage.setItem("email", tempEmail);
          setEmail(tempEmail);
          alert("Modification effectuee avec success")
        } catch (e) {
          alert("Echec de la modification")
          console.error("ERROR", e);
      }
    }
    if (editField === "password") {
      if(password === confirmPassword)
      {
        /*try
        {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            const response = await axios.patch(`${API_URL}/${userId}`, {
                "password": password
            }, { headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }});
  
            console.log("RESPONSE", response);
            alert("Modification effectuee avec success")
        } catch (e) {
            alert("Echec de la modification")
            console.error("ERROR", e);
        }*/
      
      } else alert("Les mots de passe ne correspondent pas");
    }
    setEditField(null);
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
          <div className="px-4 mx-auto">
            <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                    <div className="relative">
                      <img
                        alt="..."
                        src={profileImage}
                        className="-m-16 -ml-20 align-middle border-none rounded-full shadow-xl w-60 h-60 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-6 mt-20 text-center">
                  {/* Nom d'utilisateur */}
                  <div className="flex items-center w-full max-w-md gap-2">
                    {editField === "username" ? (
                      <>
                        <input
                          className="w-full px-3 py-1 text-2xl border rounded"
                          value={tempUsername}
                          onChange={(e) => setTempUsername(e.target.value)}
                        />
                        <button
                          onClick={handleSave}
                          className="ml-2 text-2xl text-green-500 cursor-pointer"
                          title="Sauvegarder"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="ml-1 text-2xl text-red-500 cursor-pointer"
                          title="Annuler"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="flex-1 mb-2 text-4xl font-semibold leading-normal text-left text-blueGray-700">
                          {username}
                        </h3>
                        <button
                          onClick={() => handleEdit("username")}
                          className="ml-2 text-xl cursor-pointer text-primary-default"
                          title="Modifier le nom"
                        >
                          <FaPen />
                        </button>
                      </>
                    )}
                  </div>
                  {/* Email */}
                  <div className="flex items-center w-full max-w-md gap-2">
                    {editField === "email" ? (
                      <>
                        <input
                          className="w-full px-3 py-1 text-lg border rounded"
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                        />
                        <button
                          onClick={handleSave}
                          className="ml-2 text-2xl text-green-500 cursor-pointer"
                          title="Sauvegarder"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="ml-1 text-2xl text-red-500 cursor-pointer"
                          title="Annuler"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 mb-2 text-lg leading-normal text-left text-blueGray-700">
                          {email}
                        </span>
                        <button
                          onClick={() => handleEdit("email")}
                          className="ml-2 text-xl text-primary-default"
                          title="Modifier l'email"
                        >
                          <FaPen />
                        </button>
                      </>
                    )}
                  </div>
                  {/* Mot de passe */}
                  <div className="flex items-center w-full max-w-md gap-2">
                    {editField === "password" ? (
                      <>
                        <input
                          type="password"
                          className="w-full px-3 py-1 mb-1 text-lg border rounded"
                          placeholder="Nouveau mot de passe"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                          type="password"
                          className="w-full px-3 py-1 text-lg border rounded"
                          placeholder="Confirmer le mot de passe"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          onClick={handleSave}
                          className="ml-2 text-2xl text-green-500 cursor-pointer"
                          title="Sauvegarder"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="ml-1 text-2xl text-red-500 cursor-pointer"
                          title="Annuler"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 mb-2 text-lg leading-normal text-left text-blueGray-700">
                          ********
                        </span>
                        <button
                          onClick={() => handleEdit("password")}
                          className="ml-2 text-xl cursor-pointer text-primary-default"
                          title="Modifier le mot de passe"
                        >
                          <FaPen />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="py-10 mt-10 text-center border-t border-blueGray-200">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 lg:w-9/12">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        Gérez vos informations personnelles et paramètres liés à l&apos;application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
