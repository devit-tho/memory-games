import { useMemory } from '../context';

export default function Header({ title }) {
  const { life, score, highScore } = useMemory();

  return (
    <header className="header bg-primary">
      <div className="container mx-auto flex items-center justify-between rounded-md px-6 py-5 text-center uppercase">
        <div className="header__title flex items-center">
          <h1 className="text-sm font-bold tracking-widest text-white  md:text-base lg:text-4xl xl:text-5xl">
            {title}
          </h1>

          <div className="relative">
            <img
              src="./img/card.svg"
              className="header__img absolute h-10 w-10"
            />
            <img src="./img/card.svg" className="header__img h-10 w-10" />
          </div>
        </div>

        <div className="flex gap-x-4 text-base lg:text-lg 2xl:text-xl">
          <p className="capitalize text-white">Life: {life}</p>
          <p className="capitalize text-white">Score: {score}</p>
          <p className="capitalize text-white">High Score: {highScore}</p>
        </div>
      </div>
    </header>
  );
}
