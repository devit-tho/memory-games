import { useMemory } from '../context';
import cardOpen from './../assets/audio/card-open.mp3';

function Card({ data, dispatch, setCard, ind, isClicked }) {
  const { cardOne, cardTwo, audio } = useMemory();

  function playAudio() {
    if (audio) {
      const audio = new Audio(cardOpen);
      audio.play();
    }
  }

  function handleClick({ e, item }) {
    e.preventDefault();

    if (!isClicked) {
      dispatch({ type: 'open', payload: ind });

      setCard(item);
      playAudio();
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
