import { useEffect } from 'react';
import { useMemory } from '../context';
import { motion } from 'framer-motion';
import gameOverAudio from '../assets/audio/game-over.mp3';
import Button from './Button';

function GameOver() {
  const { resetGame, score } = useMemory();

  useEffect(() => {
    function gameOver() {
      const audio = new Audio(gameOverAudio);

      setTimeout(() => {
        audio.play();
      }, 600);
    }

    gameOver();
  }, []);

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="game-over absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-y-6 bg-white/80"
    >
      <h1 className="text-6xl font-bold">Game Over</h1>
      <p>Score: {score}</p>

      <Button onClick={resetGame}>Play again</Button>
    </motion.div>
  );
}

export default GameOver;
