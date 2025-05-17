import { format } from 'date-fns';
import { useState } from 'react';
import {
  HiMiniSpeakerWave,
  HiMiniSpeakerXMark,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';
import { useMemory } from '../context';

export default function Header({ title }) {
  const [isOpenAudio, setIsOpenAudio] = useState(false);

  const { life, score, highScore, pauseGame, duration, toggleAudio, audio } =
    useMemory();

  function handleMusic() {
    setIsOpenMusic((prevMusic) => !prevMusic);
  }

  return (
    <header className="header bg-primary">
      <div className="container mx-auto flex flex-col items-center justify-between rounded-md px-6 py-5 text-center uppercase lg:flex-row">
        <div className="header__title flex items-center gap-x-2">
          <h1 className="text-nowrap text-2xl font-bold tracking-widest text-white md:text-4xl lg:text-4xl xl:text-5xl">
            {title}
          </h1>

          <div className="relative">
            <img
              src="./img/card.svg"
              className="header__img absolute h-14 w-14"
            />
            <img src="./img/card.svg" className="header__img h-14 w-14" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-4 pt-4 lg:pt-0">
          <div className="flex gap-x-4 text-base lg:text-lg 2xl:text-xl">
            <p className="flex flex-col capitalize text-white sm:flex-row sm:gap-x-2">
              <span>Life </span>
              <span>{life}</span>
            </p>
            <p className="flex flex-col capitalize text-white sm:flex-row sm:gap-x-2">
              <span>Score </span>
              <span>{score}</span>
            </p>
            <p className="flex flex-col capitalize text-white sm:flex-row sm:gap-x-2">
              <span>High Score </span>
              <span>{highScore}</span>
            </p>
            <p className="flex flex-col capitalize text-white sm:flex-row sm:gap-x-2">
              <span>Time</span>
              <span>{format(duration, 'mm:ss')}</span>
            </p>
          </div>

          <div className="flex gap-x-2">
            {/* <button className="rounded-full bg-[#F69400] p-2 text-white transition-all duration-200 hover:bg-[#F69400]/80">
              <HiMusicalNote className="h-4 w-4" />
            </button> */}
            <button
              onClick={toggleAudio}
              className="rounded-full bg-[#F69400] p-2 text-white transition-all duration-200 hover:bg-[#F69400]/80"
            >
              {audio ? (
                <HiMiniSpeakerWave className="h-4 w-4" />
              ) : (
                <HiMiniSpeakerXMark className="h-4 w-4" />
              )}
            </button>
            <button
              className="rounded-full bg-[#F69400] p-2 text-white transition-all duration-200 hover:bg-[#F69400]/80"
              onClick={pauseGame}
            >
              <HiOutlineCog6Tooth className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
