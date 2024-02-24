import { useState } from 'react';
import { useMemory } from '../context';
import {
  HiMusicalNote,
  HiNoSymbol,
  HiMiniSpeakerWave,
  HiMiniSpeakerXMark,
} from 'react-icons/hi2';

export default function Header({ title }) {
  const [isOpenAudio, setIsOpenAudio] = useState(false);
  const [isOpenMusic, setIsOpenMusic] = useState(false);
  const { life, score, highScore } = useMemory();

  function handleMusic() {
    setIsOpenMusic((prevMusic) => !prevMusic);
  }

  function handleAudio() {
    setIsOpenAudio((prevAudio) => !prevAudio);
  }

  return (
    <header className="header bg-primary">
      <div className="container mx-auto flex items-center justify-between rounded-md px-6 py-5 text-center uppercase">
        <div className="header__title flex items-center gap-x-2">
          <h1 className="text-sm font-bold tracking-widest text-white  md:text-base lg:text-4xl xl:text-5xl">
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

        <div className="flex items-center gap-x-4 text-base lg:text-lg 2xl:text-xl">
          <p className="capitalize text-white">Life: {life}</p>
          <p className="capitalize text-white">Score: {score}</p>
          <p className="capitalize text-white">High Score: {highScore}</p>

          <div className="flex gap-x-2">
            <button className="rounded-full bg-[#F69400] p-2 text-white transition-all duration-200 hover:bg-[#F69400]/80">
              <HiMusicalNote />
            </button>
            <button
              onClick={handleAudio}
              className="rounded-full bg-[#F69400] p-2 text-white transition-all duration-200 hover:bg-[#F69400]/80"
            >
              {isOpenAudio ? <HiMiniSpeakerWave /> : <HiMiniSpeakerXMark />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
