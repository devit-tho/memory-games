import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';
import Games from './components/Games';
import GameWon from './components/GameWon';
import Header from './components/Header';
import { useMemory } from './context';

export default function App() {
  const { isLose, isGameWon, isPlaying, isPause } = useMemory();

  return (
    <main className="relative flex h-dvh flex-col">
      <Header title="Memory Games" />

      <div className="h-1.5 bg-dark-orange"></div>

      <div className="grow bg-[#FFEA98] py-10">
        <Games />
      </div>

      {(!isPlaying || isPause) && <GameMenu />}

      {isLose && <GameOver />}

      {isGameWon && <GameWon />}

      <footer className="h-3 bg-primary"></footer>
    </main>
  );
}
