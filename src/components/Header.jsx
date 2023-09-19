export default function Header({ title }) {
  return (
    <header className="w-72 rounded-md bg-green-400 py-5 text-center uppercase shadow-md">
      <h1 className="text-sm font-bold tracking-widest text-white  md:text-base lg:text-2xl">
        {title}
      </h1>
    </header>
  );
}
