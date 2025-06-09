import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAppMainContext } from "../../context/AppProvider";

export default function Login() {
  const { setAuthUser } = useAppMainContext();

  const [ username, setUsername ] = useState(null);
  const [ password, setPassword ] = useState(null);

  const navigate = useNavigate();
  
  const [ errorMessage, setErrorMessage ] = useState("");

  const onUsernameChange = (e) => {
      setUsername(e.target.value);
      setErrorMessage("");
  }

  const onPasswordChange = (e) => {
      setPassword(e.target.value);
      setErrorMessage("");
  }

  const handleLogin = async () => {

      try
      {
        const datas = {
            "username": username,
            "password": password
        };

        const response = await axios.post("/auth/login/", datas); // , { headers: { "Authorization" : }}

        //console.log("RESPONSE", response);
        const token = response.data.access;
        const userId = response.data.user_id;

        const responseForUserRole = await axios.get(`/auth/users/me`, { headers: { "Authorization": `Bearer ${token}`}});

        const authUser = {
          "id": userId,
          "username": response.data.username,
          "email": response.data.email,
          "role": responseForUserRole.data.role
        };

        localStorage.setItem("token", token);
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setAuthUser(authUser);

        navigate("/");
        
      } catch (err) {
        console.log("ERROR", err);
        setErrorMessage("Identifiants incorrects");
      }


  }

  return (
    <>
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-2 lg:px-4 lg:w-6/12 xl:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-gray-200 border-0 rounded-lg shadow-lg">
              <h3 className="my-4 text-xl font-semibold text-center">Connexion</h3>
              
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="mb-3 font-bold text-center text-primary-dark">
                  <div>Connectez vous en utilisant vos identifiants</div>

                  { errorMessage != "" ? (
                    <div className="mt-2 text-red-400">{ errorMessage }</div>
                  ) : `` }
                  
                </div>
                <form>
                  {/* <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold text-black uppercase"
                      htmlFor="grid-email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="example@gmail.com"
                      id="grid-email"
                    />
                  </div> */}

                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold text-black uppercase"
                      htmlFor="grid-username"
                    >
                      Nom d&apos;utilisateur
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="example : armand1855"
                      id="grid-username"

                      onChange={onUsernameChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                      placeholder="Password"
                      id="grid-password"

                      onChange={onPasswordChange}
                    />
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none cursor-pointer hover:bg-primary-default bg-primary-dark bg-blueGray-800 active:bg-blueGray-600 hover:shadow-lg focus:outline-none"
                      type="button"

                      onClick={handleLogin}
                    >
                      Connexion
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="relative flex flex-wrap mt-6">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-primary-light hover:text-white"
                >
                  <small>Mot de passe oublié ?</small>
                </a>
              </div>
              {/* <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
