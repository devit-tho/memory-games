import { useMemory } from '../context';
import Card from './Card';

export default function Games() {
  const { datas, setCard, dispatch } = useMemory();

  return (
    <div className="container mx-auto h-[calc(100dvh-250px)] px-6 xl:h-full">
      <div className="card relative grid h-full grid-cols-2 grid-rows-[repeat(14,120px)] items-center gap-4 overflow-y-scroll rounded-xl border bg-[#FFFCEE] p-4 duration-200 sm:grid-cols-4 sm:grid-rows-[repeat(8,120px)] lg:grid-cols-8 lg:grid-rows-none lg:overflow-y-hidden 2xl:py-10">
        {datas.map((data, ind) => {
          return (
            <Card
              key={ind}
              data={data}
              dispatch={dispatch}
              setCard={setCard}
              ind={ind}
              isClicked={data.isClicked}
            />
          );
        })}
      </div>
    </div>
  );
}
