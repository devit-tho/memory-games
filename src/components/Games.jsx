import { useMemory } from '../context';
import Card from './Card';

export default function Games() {
  const { datas, setCard, dispatch } = useMemory();

  return (
    <div className="container mx-auto h-full px-6">
      <div className="card items-centeroverflow-y-scroll relative grid h-full grid-cols-2 grid-rows-[repeat(auto-fit,160px)] gap-4 rounded-xl border bg-[#FFFCEE] px-8 duration-200 md:grid-cols-4 lg:grid-cols-8 lg:overflow-y-hidden 2xl:py-10">
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
