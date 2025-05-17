import { motion } from 'framer-motion';

function Button({ children, onClick, ...props }) {
  return (
    <motion.button
      className="hover:bg-primary/60 rounded bg-primary px-4 py-2 text-2xl font-semibold text-white"
      whileTap={{
        scale: 0.8,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
