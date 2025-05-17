import { useState } from 'react';
import { useMemory } from '../context';
import Button from './Button';
import OptionsCard from './OptionsCard';

function GameMenu() {
  const { startGame, isPause, continueGame, setLevel } = useMemory();
  const [openOptions, setOpenOptions] = useState(false);

  function updateLevel(level) {
    setLevel(level);
    setOpenOptions(false);
  }

  return (
    <div className="game-menu absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-y-6 bg-white/80">
      <div className="flex w-[500px] flex-col gap-y-4 rounded-xl border-4 border-primary bg-white p-4">
        {isPause && <Button onClick={continueGame}>Continue</Button>}

        <Button onClick={startGame}>
          {isPause ? 'Start new Game' : 'Start game'}
        </Button>

        <Button onClick={() => setOpenOptions(!openOptions)}>Options</Button>
      </div>

      {openOptions && (
        <OptionsCard
          closeOption={() => setOpenOptions(false)}
          updateLevel={updateLevel}
        />
      )}
    </div>
  );
}

export default GameMenu;
