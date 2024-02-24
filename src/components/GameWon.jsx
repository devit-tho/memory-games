import { useEffect } from 'react';
import { useMemory } from '../context';
import gameWonAudio from '../assets/audio/game-win.mp3';
import Button from './Button';

function GameWon() {
  const { resetGame, score } = useMemory();

  useEffect(() => {
    function gameWon() {
      const audio = new Audio(gameWonAudio);

      audio.play();
    }

    gameWon();
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-y-6 bg-white/80">
      <h1 className="text-6xl font-bold">You won the game!</h1>
      <p>Score: {score}</p>

      <Button onClick={resetGame}>Play again</Button>
    </div>
  );
}

export default GameWon;
