import { useEffect, useCallback, useReducer } from 'react';
import a from './../datas.json';

const initialState = {
  datas: [],
  cardOne: null,
  cardTwo: null,
  cardThree: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'data':
      return { ...state, datas: action.payload };
    case 'one':
      return { ...state, cardOne: action.payload };
    case 'two':
      return { ...state, cardTwo: action.payload };
    case 'three':
      return { ...state, cardThree: action.payload };
    case 'open':
      return {
        ...state,
        datas: state.datas?.map((data, ind) =>
          action.payload === ind
            ? { ...data, isVisible: !data.isVisible }
            : data,
        ),
      };
    case '2NotMatched':
      return {
        ...state,
        datas: state.datas?.map((data) =>
          data.title === state.cardOne?.title ||
          data.title === state.cardTwo?.title
            ? { ...data, isVisible: false }
            : data,
        ),
        cardOne: null,
        cardTwo: null,
      };
    case '3NotMatched':
      return {
        ...state,
        datas: state.datas?.map((data) =>
          data.title === state.cardOne?.title ||
          data.title === state.cardTwo?.title ||
          data.title === state.cardThree?.title
            ? { ...data, isVisible: false }
            : data,
        ),
        cardOne: null,
        cardTwo: null,
        cardThree: null,
      };

    case 'reset':
      return { ...state, cardOne: null, cardTwo: null, cardThree: null };

    default:
      return initialState;
  }
}

export default function Games() {
  const [{ datas, cardOne, cardTwo, cardThree }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const randomArr = useCallback(() => {
    const shuffled = [...a];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    dispatch({ type: 'data', payload: shuffled });
  }, []);

  useEffect(() => {
    randomArr();
  }, [randomArr]);

  const setCard = (card) => {
    if (cardOne && cardTwo && cardThree) {
      dispatch({ type: 'reset' });
      return dispatch({ type: 'one', payload: card });
    }
    if (!cardOne) return dispatch({ type: 'one', payload: card });
    if (cardOne && !cardTwo) return dispatch({ type: 'two', payload: card });
    if (cardOne && cardTwo && !cardThree)
      return dispatch({ type: 'three', payload: card });
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      const cardTwoMatched = cardOne?.title === cardTwo?.title;
      if (!cardTwoMatched) {
        setTimeout(() => {
          dispatch({ type: '2NotMatched' });
        }, 300);
      }
    }
    if (cardOne && cardTwo && cardThree) {
      const matched = cardTwo.title === cardThree.title;

      if (!matched) {
        setTimeout(() => {
          dispatch({ type: '3NotMatched' });
          dispatch({ type: 'reset' });
        }, 300);
      }
    }
  }, [cardOne, cardTwo, cardThree]);

  const gameWon = datas.every((data) => data.isVisible);

  const resetGame = () => {
    dispatch({ type: 'reset' });
    randomArr();
  };

  return (
    <>
      <div className="card relative grid grid-cols-[200px_200px_200px_200px_200px_200px] flex-wrap gap-4 rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition-transform duration-200">
        {datas.map((data, i) => {
          return (
            <Card
              key={i}
              data={data}
              dispatch={dispatch}
              setCard={setCard}
              index={i}
            />
          );
        })}

        {gameWon && (
          <div className="absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-5 bg-white/80">
            <h2 className="text-7xl font-bold uppercase">You won a game</h2>
            <button
              onClick={resetGame}
              className="rounded-md bg-green-400 px-4 py-2 text-lg transition-all duration-200 hover:bg-green-500"
            >
              Play again?
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function Card({ data, dispatch, setCard, index }) {
  function handleClick({ e, item }) {
    e.preventDefault();
    dispatch({ type: 'open', payload: index });

    setCard(item);
  }

  return (
    <div className="card__side relative flex h-44 w-full basis-[207.5px] items-center justify-center overflow-hidden rounded-lg">
      {!data.isVisible && (
        <button
          onClick={(e) => handleClick({ e, item: data })}
          className={`pointer absolute top-0 z-50 h-2 w-full`}
          // disabled={true}
        >
          <img src="./img/card.png" alt="card" />
        </button>
      )}
      <div className={`card__side--back static z-20`}>
        <button>
          <img
            src={data.img}
            alt={data.title}
            className="h-32 w-full object-contain"
          />
        </button>
      </div>
    </div>
  );
}
