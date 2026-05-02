import { useCallback, useEffect, useMemo, useReducer } from 'react';
import datas from '../datas.json';
import { MemoryContext } from './MemoryContext';

const levelDatas = ['easy', 'medium', 'hard', 'difficult'];

const initialState = {
  datas: [],
  cardOne: null,
  cardTwo: null,
  life: 25,
  currentScore: 0,
  highScore: Number(JSON.parse(localStorage.getItem('config'))?.highScore) || 0,
  level: JSON.parse(localStorage.getItem('config'))?.level || levelDatas[0],
  isStart: false,
  isPause: false,
  isPlaying: false,
  audio: false,
  duration: convertMinute(5),
};

function convertMinute(minute) {
  return 1000 * 60 * minute;
}

function getLifeLevel(level) {
  if (level === 'easy') return 30;
  if (level === 'medium') return 20;
  if (level === 'hard') return 15;
  return 10;
}

function getTimeLevel(level) {
  if (level === 'easy') return convertMinute(5);
  if (level === 'medium') return convertMinute(4);
  return 3;
}

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
        datas: (state.datas || []).map((data, ind) =>
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
        isPlaying: true,
        isPause: false,
        life: getLifeLevel(state.level),
        duration: getTimeLevel(state.level),
      };
    case 'play':
      return {
        ...state,
        isPlaying: true,
        isStart: true,
        duration: getTimeLevel(state.level),
      };
    case 'pause':
      return { ...state, isPause: true, isPlaying: false };
    case 'continue':
      return { ...state, isPause: false, isPlaying: true };
    case 'level':
      return {
        ...state,
        level: action.payload.level,
        life: action.payload.life,
        duration: action.payload.duration,
        score: 0,
        isStart: false,
        isPlaying: false,
        isPause: false,
      };
    case 'timeout':
      return {
        ...state,
        duration: state.duration < 1 ? 0 : state.duration - 1000,
      };
    case 'toggleAudio':
      return { ...state, audio: !state.audio };
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

  const isLose = useMemo(
    () =>
      memoryState.life < 1 ||
      memoryState.duration < 1 ||
      (memoryState.isStart && !memoryState.isPlaying && !memoryState.isPause),
    [
      memoryState.life,
      memoryState.duration,
      memoryState.isPlaying,
      memoryState.isPause,
      memoryState.isStart,
    ],
  );

  const isGameWon = useMemo(
    () => memoryState.datas.every((memory) => memory.isVisible),
    [memoryState.datas],
  );

  useEffect(() => {
    randomCard();
  }, [randomCard]);

  // Set Level and High Score
  useEffect(() => {
    const config = JSON.parse(localStorage.getItem('config') || '{}');
    localStorage.setItem(
      'config',
      JSON.stringify({
        ...config,
        highScore:
          memoryState.currentScore > memoryState.highScore
            ? memoryState.currentScore
            : memoryState.highScore,
        level: memoryState.level,
      }),
    );
  }, [memoryState.currentScore, memoryState.level]);

  // Open Card
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

  // Duration
  useEffect(() => {
    if (!memoryState.isPlaying || memoryState.isPause || isGameWon || isLose)
      return;

    const timeout = setInterval(() => {
      dispatch({ type: 'timeout' });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [memoryState.isPlaying, memoryState.isPause]);

  // Set Level
  const setLevel = useCallback((level = levelDatas[0]) => {
    dispatch({
      type: 'level',
      payload: {
        life: getLifeLevel(level),
        level,
        duration: getTimeLevel(level),
      },
    });
  }, []);

  // Set Card
  const setCard = useCallback(
    (card) => {
      if (!memoryState.cardOne) return dispatch({ type: 'one', payload: card });
      if (memoryState.cardOne && !memoryState.cardTwo)
        return dispatch({ type: 'two', payload: card });
    },
    [memoryState.cardOne, memoryState.cardTwo],
  );

  // Toggle Audio
  const toggleAudio = useCallback(() => {
    dispatch({ type: 'toggleAudio' });
  }, []);

  // Reset Game
  const resetGame = useCallback(() => {
    dispatch({ type: 'reset' });
    randomCard();
  }, []);

  // Start Game
  const startGame = useCallback(() => {
    dispatch({ type: 'play' });
    resetGame();
  }, []);

  // Pause Game
  const pauseGame = useCallback(() => {
    dispatch({ type: 'pause' });
  }, []);

  // Continue Game
  const continueGame = useCallback(() => {
    dispatch({ type: 'continue' });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      audio: memoryState.audio,
      datas: memoryState.datas,
      life: memoryState.life,
      score: memoryState.currentScore,
      highScore: memoryState.highScore,
      cardOne: memoryState.cardOne,
      cardTwo: memoryState.cardTwo,
      isGameWon,
      isPause: memoryState.isPause,
      isLose,
      isPlaying: memoryState.isPlaying,
      isStart: memoryState.isStart,
      duration: memoryState.duration,
      level: memoryState.level,
      levelDatas,
      dispatch,
      setCard,
      setLevel,
      startGame,
      pauseGame,
      continueGame,
      resetGame,
      toggleAudio,
    }),
    [
      memoryState.audio,
      memoryState.datas,
      memoryState.life,
      memoryState.currentScore,
      memoryState.highScore,
      memoryState.cardOne,
      memoryState.cardTwo,
      memoryState.isPlaying,
      memoryState.isPause,
      memoryState.duration,
      memoryState.isStart,
      memoryState.level,
      isGameWon,
      isLose,
      dispatch,
      setLevel,
      setCard,
      startGame,
      pauseGame,
      continueGame,
      resetGame,
      toggleAudio,
    ],
  );

  return (
    <MemoryContext.Provider value={memoizedValue}>
      {children}
    </MemoryContext.Provider>
  );
}
