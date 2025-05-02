import { Link } from "react-router-dom";

import github_svg from "../../assets/img/github.svg";
import google_svg from "../../assets/img/google.svg";

export default function Login() {
  return (
    <>
      <div className="container h-full px-4 mx-auto">
        <div className="flex items-center content-center justify-center h-full">
          <div className="w-full px-4 lg:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-gray-200 border-0 rounded-lg shadow-lg">
              <h3 className="my-4 text-xl font-semibold text-center">Connexion</h3>
              
              <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                <div className="mb-3 font-bold text-center text-blueGray-400">
                  <small>Connectez vous en utilisant vos identifiants</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block mb-2 text-xs font-bold uppercase text-black"
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
                    />
                  </div>
                  {/* <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="w-5 h-5 ml-1 transition-all duration-150 ease-linear border-0 rounded form-checkbox text-blueGray-700"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className="mt-6 text-center">
                    <button
                      className="w-full px-6 py-3 mb-1 mr-1 cursor-pointer hover:bg-primary-default text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-primary-dark bg-blueGray-800 active:bg-blueGray-600 hover:shadow-lg focus:outline-none"
                      type="button"
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
