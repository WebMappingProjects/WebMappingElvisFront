import { FaDribbble, FaFacebookSquare, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="relative pt-8 pb-6 bg-blueGray-200">
        <div
          className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
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
              className="fill-current text-blueGray-200"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full px-4 lg:w-6/12">
              <h4 className="text-3xl font-semibold">Sig Geospatial App</h4>
              <h5 className="mt-0 mb-2 text-lg text-blueGray-600">
                Let's keep our world into a single web app
              </h5>
              {/* <div className="mt-6 mb-6 lg:mb-0">
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-lightBlue-400 align-center focus:outline-none"
                  type="button"
                >
                  <FaTwitter />
                </button>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-lightBlue-600 align-center focus:outline-none"
                  type="button"
                >
                  <FaFacebookSquare />
                </button>
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal text-pink-400 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
                  type="button"
                >
                  <FaDribbble />
                </button>
              </div> */}
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex flex-wrap mb-6 items-top">
                <div className="w-full px-4 ml-auto lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold uppercase text-blueGray-500">
                    Liens utiles
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                        href="#"
                      >
                        A propos de nous
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                        href="#"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                        href="#"
                      >
                        Produit gratuit
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full px-4 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold uppercase text-blueGray-500">
                    Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="block pb-2 text-sm font-semibold text-blueGray-600 hover:text-blueGray-800"
                        href="#"
                      >
                        Contactez nous
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-4 mx-auto text-center md:w-4/12">
              <div className="py-1 text-sm font-semibold text-blueGray-500">
                Copyright © {new Date().getFullYear()} Geoportal app by{" "}
                <a
                  href="#"
                  className="text-blueGray-500 hover:text-blueGray-800"
                >
                  ENSPY Students
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
