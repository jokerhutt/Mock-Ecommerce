import { motion } from "framer-motion";

const transition = (OgComponent) => (props) => {
  return (
    <>
      <OgComponent {...props}/>
      <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nike-image"> 
      <img src="https://static.vecteezy.com/system/resources/thumbnails/010/994/411/small_2x/nike-logo-white-clothes-design-icon-abstract-football-illustration-with-black-background-free-vector.jpg"/>
        </div>
     </motion.div>


      <motion.div 
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
        <div className="nike-image"> 
        <img src="https://static.vecteezy.com/system/resources/thumbnails/010/994/411/small_2x/nike-logo-white-clothes-design-icon-abstract-football-illustration-with-black-background-free-vector.jpg"/>
        </div>
        </motion.div>
    </>
  );
};

export default transition;