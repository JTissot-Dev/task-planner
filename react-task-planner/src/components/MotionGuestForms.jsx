import { motion } from "framer-motion";

const MotionGuestForms = ({children}) => {
  return (
    <motion.div
    initial={{ opacity: 0.5, rotateY: -90 }} // Animation d'entrée
    animate={{ opacity: 1, rotateY: 0 }} // Animation lorsque le composant est monté
    exit={{ opacity: 0 }} // Animation de sortie
    transition={{ duration: 0.5 }} // Durée de l'animation
    className="z-20 w-screen sm:w-96 mx-3 sm:mx-0 flex"
    >
      { children }
    </motion.div>
  )

}

export default MotionGuestForms;