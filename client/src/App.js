import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import Context, { reducer } from './Context';

import MainPage from './pages/MainPage';

const App = () => {
  const initialState = {
    user: {},
    isAuthenticated: false,
    authError: null,
    isLoggedIn: false,
    displayState: 'home', //'home' or 'form' or 'edit'
    editIdx: 0,

    isNightMode: false,

    tempoPercentManual: 40,
    tempoTargetManual: 150,
    currentPiece: 0,

    pieces: [
      // TODO remove reference dummy data below
      // {
      //   name: 'Arban 1',
      //   tempoTarget: 108,
      //   currentDay: 2,
      //   currentSession: 0,
      //   sectionsCount: 4,
      //   images: [
      //     'https://res.cloudinary.com/dpncc3nbo/image/upload/v1600966631/tempoBuilder/computed-filename-using-request.png',
      //     'https://res.cloudinary.com/dpncc3nbo/image/upload/v1600967724/tempoBuilder/computed-filename-using-request.png',
      //   ],
      //   plan: [
      //     [
      //       { section: 'A', repetitions: 3, percent: 50 },
      //       { section: 'B', repetitions: 3, percent: 50 },
      //     ],
      //     [
      //       { section: 'C', repetitions: 3, percent: 50 },
      //       { section: 'D', repetitions: 3, percent: 50 },
      //     ],
      //     [
      //       { section: 'A', repetitions: 2, percent: 75 },
      //       { section: 'D', repetitions: 2, percent: 80 },
      //     ],
      //     [
      //       { section: 'B', repetitions: 3, percent: 75 },
      //       { section: 'C', repetitions: 3, percent: 80 },
      //       { section: 'D', repetitions: 3, percent: 80 },
      //     ],
      //     [{ section: 'all', repetitions: 2, percent: 100 }],
      //   ],
      // },
      // {
      //   name: 'Charlier 1',
      //   tempoTarget: 120,
      //   currentDay: 0,
      //   currentSession: 0,
      //   sectionsCount: 3,
      //   images: [],
      //   plan: [
      //     [
      //       { section: 'A', repetitions: 3, percent: 50 },
      //       { section: 'B', repetitions: 3, percent: 50 },
      //     ],
      //     [
      //       { section: 'C', repetitions: 3, percent: 50 },
      //       { section: 'A', repetitions: 3, percent: 50 },
      //     ],
      //     [
      //       { section: 'A', repetitions: 2, percent: 75 },
      //       { section: 'B', repetitions: 2, percent: 80 },
      //     ],
      //     [
      //       { section: 'B', repetitions: 3, percent: 75 },
      //       { section: 'C', repetitions: 3, percent: 80 },
      //     ],
      //     [{ section: 'all', repetitions: 2, percent: 95 }],
      //     [{ section: 'all', repetitions: 2, percent: 100 }],
      //   ],
      // },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.StrictMode>
      <Context.Provider value={{ state, dispatch }}>
        <MainPage />
      </Context.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
