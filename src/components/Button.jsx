function Button({ children, onClick, ...props }) {
  return (
    <button
      className="rounded bg-primary px-4 py-2 text-2xl font-semibold text-white hover:bg-primary/60"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
