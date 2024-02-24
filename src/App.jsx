import Header from './components/Header';
import Games from './components/Games';
import { useMemory } from './context';

export default function App() {
  const { isLose, resetGame } = useMemory();

  return (
    <main className="relative flex h-dvh flex-col">
      <Header title="Memory Games" />
      <div className="h-1.5 bg-[#F69400]"></div>

      <div className="grow bg-[#FFEA98] py-10">
        <Games />
      </div>

      {isLose && (
        <div className="absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-y-4 bg-white/80">
          <h1 className="text-6xl font-bold">Game Over</h1>

          <button
            className="rounded bg-primary px-4 py-2 text-2xl font-bold text-white"
            onClick={resetGame}
          >
            Play again
          </button>
        </div>
      )}

      <footer className="h-3 bg-primary"></footer>
    </main>
  );
}
