import { motion } from 'framer-motion';

function Button({ children, onClick, ...props }) {
  return (
    <motion.button
      className="rounded bg-primary px-4 py-2 text-2xl font-semibold text-white transition-all duration-300 hover:bg-primary/60"
      whileTap={{
        scale: 0.9,
      }}
      transition={{
        duration: 1.2,
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
