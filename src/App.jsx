import Header from './components/Header';
import Games from './components/Games';
import { useMemory } from './context';
import GameOver from './components/GameOver';

export default function App() {
  const { isLose, resetGame } = useMemory();

  return (
    <main className="relative flex h-dvh flex-col">
      <Header title="Memory Games" />
      <div className="h-1.5 bg-[#F69400]"></div>

      <div className="grow bg-[#FFEA98] py-10">
        <Games />
      </div>

      {isLose && <GameOver />}

      <footer className="h-3 bg-primary"></footer>
    </main>
  );
}
