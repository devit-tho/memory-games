import _capitalize from 'lodash/capitalize';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useMemory } from '../context';

function OptionsCard({ closeOption, updateLevel }) {
  const { levelDatas, level: lvl } = useMemory();

  return (
    <div className="absolute z-20 flex h-dvh w-full items-center justify-center bg-black/40">
      <div className="relative w-full max-w-[500px] p-4">
        <button
          className="absolute -top-1 right-0 rounded-full border-4 border-primary bg-white p-2"
          onClick={closeOption}
        >
          <HiOutlineXMark className="size-4" />
        </button>

        <div className="flex flex-col gap-y-4 rounded-xl border-4 border-primary bg-white p-4">
          {levelDatas.map((level) => (
            <button
              key={level}
              onClick={() => updateLevel(level)}
              className={`hover:bg-primary/80 rounded-lg border border-primary py-4 transition-all active:scale-95 ${level === lvl ? 'bg-primary text-white' : 'bg-white text-primary'}`}
            >
              {_capitalize(level)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OptionsCard;
