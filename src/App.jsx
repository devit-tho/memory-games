import { useMemory } from './context';
import Header from './components/Header';
import Games from './components/Games';
import GameOver from './components/GameOver';

export default function App() {
  const { isLose } = useMemory();

  return (
    <main className="relative flex h-dvh flex-col">
      <Header title="Memory Games" />
      <div className="bg-dark-orange h-1.5"></div>

      <div className="grow bg-[#FFEA98] py-10">
        <Games />
      </div>

      {isLose && <GameOver />}

      <footer className="h-3 bg-primary"></footer>
    </main>
  );
}
