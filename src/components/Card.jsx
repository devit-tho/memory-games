import { useMemory } from '../context';

function Card({ data, dispatch, setCard, ind, isClicked }) {
  const { cardOne, cardTwo } = useMemory();

  function handleClick({ e, item }) {
    e.preventDefault();

    if (!isClicked) {
      dispatch({ type: 'open', payload: ind });

      setCard(item);
    }
  }

  return (
    <button
      className={`card ${data.isVisible ? ' open' : ''}`}
      onClick={(e) => handleClick({ e, item: data })}
      disabled={isClicked || (cardOne && cardTwo)}
    >
      <div
        className="card__side card__front"
        // disabled={true}
      >
        <img src="./img/card.svg" alt="card" className="h-full w-full" />
      </div>

      <div className="card__side card__back">
        <img src={data.img} alt={data.title} className="h-full w-full" />
      </div>
    </button>
  );
}

export default Card;
