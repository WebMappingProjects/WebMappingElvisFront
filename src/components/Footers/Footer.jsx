import { motion } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaGlobe, 
  FaGithub, 
  FaTwitter, 
  FaLinkedin,
  FaYoutube
} from "react-icons/fa";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-16 pb-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Colonne Logo et description */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-8 h-8 text-blue-300" />
              <span className="ml-2 text-2xl font-bold">
                Ma<span className="text-blue-200">Karte</span>
              </span>
            </div>
            <p className="text-blue-100">
              Plateforme géospatiale innovante pour explorer et analyser les données du département du Mfoundi.
            </p>
            <div className="flex space-x-4">
              {[FaGithub, FaTwitter, FaLinkedin, FaYoutube].map((Icon, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Icon className="text-blue-200" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Colonne Liens rapides */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-blue-700 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Accueil", href: "/" },
                { name: "Carte interactive", href: "/map" },
                { name: "Données", href: "#data" },
                { name: "Statistiques", href: "#stats" },
                { name: "Contact", href: "/contact" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={link.href} className="text-blue-100 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne Catégories */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-blue-700 pb-2">
              Données
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Éducation", url: "/admin/tables/enseignement"},
                { name: "Santé", url: "/admin/tables/centre-sante"},
                { name: "Services publiques", url: "/admin/tables/services-publiques"},
                { name: "Sécurité", url: "/admin/tables/securite"},
                { name: "Hôtels", url: "/admin/tables/hebergement"},
                { name: "Religion", url: "/admin/tables/eglises"},
              ].map((category, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={category.url} className="text-blue-100 hover:text-white transition-colors">
                    {category.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-blue-700 pb-2">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-300 flex-shrink-0" />
                <span className="text-blue-100">
                  Université de Yaoundé I,<br />
                  Département de Géographie,<br />
                  Yaoundé, Cameroun
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-blue-300" />
                <span className="text-blue-100">+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-300" />
                <a href="mailto:contact@makarte.cm" className="text-blue-100 hover:text-white">
                  contact@makarte.cm
                </a>
              </li>
              <li className="flex items-center">
                <FaGlobe className="mr-3 text-blue-300" />
                <a href="https://www.makarte.cm" className="text-blue-100 hover:text-white">
                  www.makarte.cm
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Barre de copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-blue-700 mt-12 pt-8 text-center text-blue-300"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              © {new Date().getFullYear()} MaKarte - Tous droits réservés
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions d&apos;utilisation</a>
            </div>
          </div>
          <p className="mt-4 text-sm">
            Développé par les étudiants de l&apos;ENSPY - Projet académique
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;