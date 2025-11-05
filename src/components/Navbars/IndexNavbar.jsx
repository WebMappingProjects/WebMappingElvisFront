/*eslint-disable*/
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  FaMapMarkedAlt, 
  FaLayerGroup, 
  FaChartLine, 
  FaUser, 
  FaSignOutAlt,
  FaCog,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useAppMainContext } from "../../context/AppProvider";
import axios from "../../api/axios";
import { getCookie, refreshAccess, RequestType } from "../../utils/tools";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDatas, setUserDatas] = useState({ role: "lambda" });
  const [ isAuthenticated, setIsAutheticated ] = useState(false);
  const controls = useAnimation();
  
  const { authUser, setAuthUser } = useAppMainContext();

  useEffect(() => {
    //setIsAutheticated(getCookie("authenticated") != null);
    setIsAutheticated(localStorage.getItem("token") != null);
  }, []);

  useEffect(() => {
    const loadUserDatas = () => {
      const user = JSON.parse(window.localStorage.getItem("authUser"));
      setUserDatas(user);
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
        controls.start("scrolled");
      } else {
        setScrolled(false);
        controls.start("initial");
      }
    };

    loadUserDatas();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const url = "/auth/users/logout/";
      const refreshDatas = await refreshAccess(url, RequestType.POST);
      
      let response = null;
      if(refreshDatas.response) {
        response = refreshDatas.response;
      } else {
        const token = refreshDatas.token;
        response = await axios.post(url, {}, {
          headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
          },
          withCredentials: true
        });
      }

      if(response.status === 200 || response.status === 201 || response.status === 204) {
        localStorage.clear();
        setAuthUser(null);
        window.location.reload();
      } else {
        console.log("LOGOUT FAILED", response);
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  const navLinks = [
    { name: "Fonctionnalités", icon: <FaMapMarkedAlt />, href: "/#features" },
    { name: "Données", icon: <FaLayerGroup />, href: "/#data" },
    { name: "Statistiques", icon: <FaChartLine />, href: "/#stats" }
  ];

  const userLinks = [
    { name: "Profil", icon: <FaUser />, href: "/profile" },
    { name: "Administration", icon: <FaCog />, href: "/users-administration", adminOnly: true },
    { name: "Déconnexion", icon: <FaSignOutAlt />, onClick: handleLogout }
  ];

  const variants = {
    initial: { 
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "none",
      backdropFilter: "blur(0px)"
    },
    scrolled: { 
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(8px)"
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      initial="initial"
      animate={controls}
      transition={{ duration: 0.1 }}
      variants={variants}
      className="fixed top-0 z-50 w-full transition-all duration-300"
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center">
              <FaMapMarkedAlt className="w-8 h-8 text-blue-600" />
              <span className="ml-3 text-2xl font-bold text-blue-600">
                Ma<span className="text-blue-800">Karte</span>
              </span>
            </Link>
          </motion.div>

          { isAuthenticated == true ? (
            <>
              {/* Liens de navigation - Desktop */}
              <div className="hidden md:flex md:items-center md:space-x-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={link.href}
                      className="flex items-center px-3 py-2 text-sm font-medium text-black transition-colors hover:text-blue-600"
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Menu utilisateur - Desktop */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                {userLinks.map((link, index) => {
                  if (link.adminOnly && userDatas?.role !== "admin") return null;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={link.href}
                        onClick={link.onClick}
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg cursor-pointer ${
                          link.name === "Déconnexion" 
                            ? "text-white bg-red-500 hover:bg-red-600" 
                            : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <span className="mr-2">{link.icon}</span>
                        {link.name}
                      </a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bouton menu mobile */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden focus:outline-none"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                {navbarOpen ? (
                  <FaTimes className="w-6 h-6 text-gray-700" />
                ) : (
                  <FaBars className="w-6 h-6 text-gray-700" />
                )}
              </motion.button>
            </>
          ) : null}
        </div>
      </div>

      { isAuthenticated == true ? (
        <>

          {/* Menu mobile */}
          <motion.div
            initial="closed"
            animate={navbarOpen ? "open" : "closed"}
            variants={{
              open: { 
                height: "auto",
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              },
              closed: { 
                height: 0,
                opacity: 0,
                transition: { 
                  when: "afterChildren",
                  staggerChildren: 0.1,
                  staggerDirection: -1
                }
              }
            }}
            className="overflow-hidden md:hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-200">
              {navLinks.map((link, index) => (
                <motion.a
                  key={`nav-${index}`}
                  variants={itemVariants}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100"
                  onClick={() => setNavbarOpen(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{link.icon}</span>
                    {link.name}
                  </div>
                </motion.a>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-200">
                {userLinks.map((link, index) => {
                  if (link.adminOnly && userDatas?.role !== "admin") return null;
                  return (
                    <motion.a
                      key={`user-${index}`}
                      variants={itemVariants}
                      href={link.href}
                      onClick={(e) => {
                        if (link.onClick) link.onClick(e);
                        setNavbarOpen(false);
                      }}
                      className={`block px-3 py-2 text-base font-medium rounded-md ${
                        link.name === "Déconnexion" 
                          ? "text-white bg-red-500 hover:bg-red-600" 
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{link.icon}</span>
                        {link.name}
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      ) : null }
    </motion.nav>
  );
}