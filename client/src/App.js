import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import { Router } from '@reach/router';
import { css } from '@emotion/core';

import Context, { reducer } from './Context';

import HomePage from './pages/HomePage';

const App = () => {
  const initialState = {
    isLoggedIn: true,
    tempoPercentManual: 40, //manual
    tempoTargetManual: 150,
    currentPiece: 0,
    pieces: [
      {
        name: 'Arban 1',
        tempoTarget: 108,
        currentDay: 3,
        currentSession: 0,
        sections: 4,
        images: [],
        plan: [
          [
            { letter: 'A', repetitions: 3, percent: 50 },
            { letter: 'B', repetitions: 3, percent: 50 },
          ],
          [
            { letter: 'C', repetitions: 3, percent: 50 },
            { letter: 'D', repetitions: 3, percent: 50 },
          ],
          [
            { letter: 'A', repetitions: 2, percent: 75 },
            { letter: 'D', repetitions: 2, percent: 80 },
          ],
          [
            { letter: 'B', repetitions: 3, percent: 75 },
            { letter: 'C', repetitions: 3, percent: 80 },
          ],
          [{ letter: 'all', repetitions: 2, percent: 100 }],
        ],
      },
      {
        name: 'Charlier 1',
        tempoTarget: 120,
        currentDay: 0,
        currentSession: 0,
        sections: 3,
        images: [],
        plan: [
          [
            { letter: 'A', repetitions: 3, percent: 50 },
            { letter: 'B', repetitions: 3, percent: 50 },
          ],
          [
            { letter: 'C', repetitions: 3, percent: 50 },
            { letter: 'A', repetitions: 3, percent: 50 },
          ],
          [
            { letter: 'A', repetitions: 2, percent: 75 },
            { letter: 'B', repetitions: 2, percent: 80 },
          ],
          [
            { letter: 'B', repetitions: 3, percent: 75 },
            { letter: 'C', repetitions: 3, percent: 80 },
          ],
          [{ letter: 'all', repetitions: 2, percent: 95 }],
          [{ letter: 'all', repetitions: 2, percent: 100 }],
        ],
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.StrictMode>
      <Context.Provider value={{ state, dispatch }}>
        <HomePage />
      </Context.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

{
  /* <Router>
<HomePage path="/"/>
</Router> */
}
