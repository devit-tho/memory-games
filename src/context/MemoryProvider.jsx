import { useReducer, useEffect, useCallback, useMemo } from 'react';
import { MemoryContext } from './MemoryContext';
import datas from '../datas.json';

const initialState = {
  datas: [],
  cardOne: null,
  cardTwo: null,
  life: 25,
  currentScore: 0,
  highScore: localStorage.getItem('highScore') || 0,
  level: 'easy',
  duration: 1000 * 60 * 5,
};

function memoryReducer(state = initialState, action) {
  switch (action.type) {
    case 'initialData':
      return { ...state, datas: action.payload.datas };
    case 'one':
      return { ...state, cardOne: action.payload };
    case 'two':
      return { ...state, cardTwo: action.payload };
    case 'open':
      return {
        ...state,
        datas: state.datas?.map((data, ind) =>
          action.payload === ind
            ? { ...data, isVisible: !data.isVisible, isClicked: true }
            : data,
        ),
      };
    case 'matched':
      return {
        ...state,
        cardOne: null,
        cardTwo: null,
        currentScore: state.currentScore + 100,
      };
    case 'notMatched':
      return {
        ...state,
        datas: state.datas?.map((data) =>
          data.id === state.cardOne?.id || data.id === state.cardTwo?.id
            ? { ...data, isVisible: false, isClicked: false }
            : data,
        ),
        life: state.life - 1,
        cardOne: null,
        cardTwo: null,
        currentScore: state.currentScore === 0 ? 0 : state.currentScore - 20,
      };
    case 'reset':
      return {
        ...state,
        cardOne: null,
        cardTwo: null,
        currentScore: 0,
        life: 25,
      };
    default:
      return initialState;
  }
}

export function MemoryProvider({ children }) {
  const [memoryState, dispatch] = useReducer(memoryReducer, initialState);

  const randomCard = useCallback(() => {
    const updatedData = datas.map((data, ind) => ({
      ...data,
      id: ind + 1,
      isClicked: false,
      isVisible: false,
    }));
    const shuffled = [...updatedData, ...updatedData];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    dispatch({
      type: 'initialData',
      payload: {
        datas: shuffled,
      },
    });
  }, []);

  useEffect(() => {
    randomCard();
  }, [randomCard]);

  useEffect(() => {
    localStorage.setItem('highScore', memoryState.highScore);
  }, [memoryState.highScore]);

  useEffect(() => {
    if (memoryState.cardOne && memoryState.cardTwo) {
      const isMatched = memoryState.cardOne?.id === memoryState.cardTwo?.id;

      if (!isMatched) {
        setTimeout(() => {
          dispatch({ type: 'notMatched' });
        }, 1000);
      } else {
        dispatch({ type: 'matched' });
      }
    }
  }, [memoryState.cardOne, memoryState.cardTwo]);

  const setLevel = useCallback((level = 'easy') => {
    if (level === 'easy')
      dispatch({
        type: 'levelEasy',
        payload: {
          life: 20,
        },
      });
    else if (level === 'medium')
      dispatch({
        type: 'levelMedium',
        payload: {
          life: 15,
        },
      });
    else if (level === 'hard')
      dispatch({ type: 'levelHard', payload: { life: 10 } });

    if (level === 'difficult') {
      dispatch({ type: 'levelDifficult', payload: { life: 5 } });
    }
  }, []);

  const setCard = useCallback(
    (card) => {
      if (!memoryState.cardOne) return dispatch({ type: 'one', payload: card });
      if (memoryState.cardOne && !memoryState.cardTwo)
        return dispatch({ type: 'two', payload: card });
    },
    [memoryState.cardOne, memoryState.cardTwo],
  );

  const resetGame = useCallback(() => {
    dispatch({ type: 'reset' });
    randomCard();
  }, []);

  const isLose = useMemo(() => memoryState.life <= 0, [memoryState.life]);

  const isGameWon = useMemo(
    () => memoryState.datas.every((memory) => memory.isVisible),
    [memoryState.datas],
  );

  const memoizedValue = useMemo(
    () => ({
      datas: memoryState.datas,
      life: memoryState.life,
      score: memoryState.currentScore,
      highScore: memoryState.highScore,
      cardOne: memoryState.cardOne,
      cardTwo: memoryState.cardTwo,
      isGameWon,
      isLose,
      dispatch,
      setCard,
      setLevel,
      resetGame,
    }),
    [
      memoryState.datas,
      memoryState.life,
      memoryState.currentScore,
      memoryState.highScore,
      memoryState.cardOne,
      memoryState.cardTwo,
      isGameWon,
      isLose,
      dispatch,
      setLevel,
      setCard,
      resetGame,
    ],
  );

  return (
    <MemoryContext.Provider value={memoizedValue}>
      {children}
    </MemoryContext.Provider>
  );
}
