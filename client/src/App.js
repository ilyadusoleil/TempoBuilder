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
      // {
      //   name: 'Arban 1',
      //   tempoTarget: 108,
      //   currentDay: 2,
      //   currentSession: 0,
      //   sections: 4,
      //   images: [
      //     'https://res.cloudinary.com/dpncc3nbo/image/upload/v1600966631/tempoBuilder/computed-filename-using-request.png',
      //     'https://res.cloudinary.com/dpncc3nbo/image/upload/v1600967724/tempoBuilder/computed-filename-using-request.png',
      //   ],
      //   plan: [
      //     [
      //       { letter: 'A', repetitions: 3, percent: 50 },
      //       { letter: 'B', repetitions: 3, percent: 50 },
      //     ],
      //     [
      //       { letter: 'C', repetitions: 3, percent: 50 },
      //       { letter: 'D', repetitions: 3, percent: 50 },
      //     ],
      //     [
      //       { letter: 'A', repetitions: 2, percent: 75 },
      //       { letter: 'D', repetitions: 2, percent: 80 },
      //     ],
      //     [
      //       { letter: 'B', repetitions: 3, percent: 75 },
      //       { letter: 'C', repetitions: 3, percent: 80 },
      //       { letter: 'D', repetitions: 3, percent: 80 },
      //     ],
      //     [{ letter: 'all', repetitions: 2, percent: 100 }],
      //   ],
      // },
      // {
      //   name: 'Charlier 1',
      //   tempoTarget: 120,
      //   currentDay: 0,
      //   currentSession: 0,
      //   sections: 3,
      //   images: [],
      //   plan: [
      //     [
      //       { letter: 'A', repetitions: 3, percent: 50 },
      //       { letter: 'B', repetitions: 3, percent: 50 },
      //     ],
      //     [
      //       { letter: 'C', repetitions: 3, percent: 50 },
      //       { letter: 'A', repetitions: 3, percent: 50 },
      //     ],
      //     [
      //       { letter: 'A', repetitions: 2, percent: 75 },
      //       { letter: 'B', repetitions: 2, percent: 80 },
      //     ],
      //     [
      //       { letter: 'B', repetitions: 3, percent: 75 },
      //       { letter: 'C', repetitions: 3, percent: 80 },
      //     ],
      //     [{ letter: 'all', repetitions: 2, percent: 95 }],
      //     [{ letter: 'all', repetitions: 2, percent: 100 }],
      //   ],
      // },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.StrictMode>
      {/* <ReactQueryCacheProvider queryCache={queryCache}> */}
      <Context.Provider value={{ state, dispatch }}>
        <MainPage />
      </Context.Provider>
      {/* </ReactQueryCacheProvider> */}
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
