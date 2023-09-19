import Header from "./components/Header";
import Games from "./components/Games";

export default function App() {
  return (
    <main className="mx-auto flex w-[1400px] flex-col items-center gap-4 p-3">
      <Header title="Memory Games" />
      <Games />
    </main>
  );
}
