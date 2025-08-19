/*eslint-disable*/
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import IndexNavbar from "../components/Navbars/IndexNavbar";
import Footer from "../components/Footers/Footer";

import pattern_react from "../assets/img/pattern_react.png";
import centre_divisions from "../assets/img/960px-Centre_divisions.png";
import { 
  FaBuilding, FaCodeBranch, FaCross, FaDraftingCompass, 
  FaHotel, FaList, FaPlusSquare, FaRunning, FaSchool, 
  FaShieldAlt, FaSitemap, FaMapMarkedAlt, FaChartLine, 
  FaLayerGroup, FaDatabase, FaGlobeAfrica
} from "react-icons/fa";

// Animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const AnimatedSection = ({ children, id }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
      id={id}
      className="py-20 overflow-hidden"
    >
      {children}
    </motion.section>
  );
};

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      
      {/* Hero Section avec animation */}
      <section className="relative flex items-center min-h-screen pt-16 overflow-hidden bg-gradient-to-br from-primary-dark via-primary-default to-blueGray-700">
        <div className="absolute inset-0 z-0 bg-center bg-cover opacity-30 blur-sm" style={{backgroundImage: `url(${pattern_react})`}}></div>
        
        <div className="container z-20 flex flex-wrap items-center mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 md:w-8/12 lg:w-6/12 xl:w-6/12"
          >
            <div className="pt-20 md:pt-32 sm:pt-0">
              <h1 className="text-3xl font-extrabold text-white md:text-6xl drop-shadow-lg">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="block mb-2"
                >
                  MaKarte
                </motion.span>
                <motion.em 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-4xl font-light text-primary-light-op block mt-4"
                >
                  Votre portail géospatial intelligent
                </motion.em>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-sm leading-relaxed text-justify md:text-base md:text-left text-white/90"
              >
                Explorez, analysez et interagissez avec les données géospatiales du département du Mfoundi. 
                Une plateforme intuitive pour les professionnels et le grand public.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 mt-12 mb-4"
              >
                <Link
                  to="/map"
                  className="px-4 py-2 md:px-8 md:py-4 text-[10px] text-center font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-600 rounded-lg shadow-lg md:text-base hover:bg-primary-dark hover:shadow-xl focus:outline-none"
                >
                  Accéder à la carte
                </Link>
                <a
                  href="#features"
                  className="px-4 py-2 md:px-8 md:py-4 text-[10px] text-center font-bold uppercase transition-all duration-150 ease-linear bg-white border-2 rounded-lg shadow-lg md:text-base text-primary-default hover:bg-primary-default hover:text-white hover:shadow-xl border-primary-default focus:outline-none mr-3"
                >
                  Découvrir les fonctionnalités
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden md:block md:w-4/12 lg:w-5/12 xl:w-4/12"
          >
            <div className="relative">
              <motion.div 
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute z-10 w-full h-full bg-blue-400 rounded-full opacity-20 -top-10 -left-10 mix-blend-multiply filter blur-xl"
              ></motion.div>
              <img
                src={centre_divisions}
                alt="Carte du Mfoundi"
                className="relative z-20 w-full rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 right-0 flex justify-center mb-8"
        >
          <a href="#features" className="p-2 text-white animate-bounce">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </section>

      {/* Section Fonctionnalités */}
      <AnimatedSection id="features">
        <div className="container mx-auto">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2 variants={item} className="text-4xl font-bold text-primary-dark mb-4">
              Fonctionnalités clés
            </motion.h2>
            <motion.p variants={item} className="max-w-2xl mx-auto mb-12 text-lg text-gray-600">
              Découvrez les outils puissants qui vous permettent d'exploiter pleinement les données géospatiales
            </motion.p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-3xl text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <FaMapMarkedAlt />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Carte Interactive</h3>
              <p className="text-gray-600">
                Explorez les données géospatiales sur une carte dynamique avec des outils de visualisation avancés.
              </p>
              <Link 
                to="/map" 
                className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
              >
                Accéder à la carte
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-3xl text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <FaLayerGroup />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Couches Géospatiales</h3>
              <p className="text-gray-600">
                Superposez et combinez différentes couches de données pour une analyse approfondie.
              </p>
              <Link 
                to="/admin/tables" 
                className="inline-flex items-center mt-4 text-green-600 hover:text-green-800"
              >
                Explorer les couches
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-3xl text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                <FaChartLine />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">Analyses Avancées</h3>
              <p className="text-gray-600">
                Outils statistiques et d'analyse spatiale pour extraire des insights pertinents.
              </p>
              <Link 
                to="/stats" 
                className="inline-flex items-center mt-4 text-purple-600 hover:text-purple-800"
              >
                Voir les analyses
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section Données */}
      <AnimatedSection id="data" className="bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2 variants={item} className="text-4xl font-bold text-primary-dark mb-4">
              Données disponibles
            </motion.h2>
            <motion.p variants={item} className="max-w-2xl mx-auto mb-12 text-lg text-gray-600">
              Accédez à une vaste collection de données géospatiales actualisées
            </motion.p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: <FaSchool />, title: "Éducation", description: "Établissements scolaires et universitaires" },
              { icon: <FaPlusSquare />, title: "Santé", description: "Hôpitaux, cliniques et pharmacies" },
              { icon: <FaBuilding />, title: "Administration", description: "Bâtiments et services publics" },
              { icon: <FaShieldAlt />, title: "Sécurité", description: "Commissariats et postes de police" },
              { icon: <FaHotel />, title: "Hôtels", description: "Hôtels et lieux d'hébergement" },
              { icon: <FaCross />, title: "Religion", description: "Lieux de culte et centres religieux" },
              { icon: <FaRunning />, title: "Sport", description: "Infrastructures sportives" },
              { icon: <FaDatabase />, title: "Autres", description: "Divers services et établissements" }
            ].map((itemData, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-xl text-white bg-blue-600 rounded-full">
                  {itemData.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">{itemData.title}</h3>
                <p className="text-gray-600">{itemData.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Section Statistiques */}
      <AnimatedSection id="stats">
        <div className="container mx-auto">
          <div className="p-8 bg-gradient-to-r from-primary-dark to-primary-default rounded-2xl shadow-xl">
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.h2 variants={item} className="text-3xl font-bold text-white mb-4">
                MaKarte en chiffres
              </motion.h2>
              <motion.p variants={item} className="max-w-2xl mx-auto mb-12 text-lg text-blue-100">
                Quelques statistiques sur notre plateforme et les données disponibles
              </motion.p>
            </motion.div>
            
            <div className="grid gap-8 md:grid-cols-3 text-black">
              {[
                { icon: <FaBuilding />, value: "120+", label: "Structures administratives" },
                { icon: <FaSchool />, value: "300+", label: "Établissements scolaires" },
                { icon: <FaPlusSquare />, value: "50+", label: "Structures de santé" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white text-primary-dark bg-opacity-10 backdrop-blur-sm rounded-xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl text-primary-default bg-white bg-opacity-20 rounded-full">
                    {stat.icon}
                  </div>
                  <motion.p 
                    className="text-4xl font-extrabold text-primary-default mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-lg text-primary-dark-op">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section CTA */}
      <AnimatedSection className="bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl p-8 mx-auto text-center bg-white rounded-xl shadow-lg">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6 text-3xl font-bold text-gray-800"
            >
              Prêt à explorer les données géospatiales du Mfoundi ?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 text-lg text-gray-600"
            >
              Rejoignez notre plateforme et bénéficiez d'un accès complet à toutes les fonctionnalités.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/map"
                className="px-8 py-4 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-600 rounded-lg shadow-lg md:text-base hover:bg-blue-700 hover:shadow-xl focus:outline-none"
              >
                Commencer l'exploration
              </Link>
              <Link
                to="/auth/login"
                className="px-8 py-4 text-sm font-bold text-blue-600 uppercase transition-all duration-150 ease-linear bg-white border-2 border-blue-600 rounded-lg shadow-lg md:text-base hover:bg-blue-50 hover:shadow-xl focus:outline-none"
              >
                Connectez vous
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
      
      <style>{`
        body { font-family: 'Inter', 'Poppins', 'Segoe UI', Arial, sans-serif; }
        .text-primary-dark { color: #1e293b; }
        .bg-primary-default { background-color: #2563eb; }
        .bg-primary-dark { background-color: #1e293b; }
        .text-primary-light { color: #60a5fa; }
        .text-primary-light-op { color: rgba(96, 165, 250, 0.9); }
        .bg-primary-dark-op { background: rgba(30,41,59,0.85); }
        .drop-shadow-lg { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15)); }
      `}</style>
    </>
  );
}