import { createContext } from 'react';
import _ from 'lodash';

const Context = createContext({});

const GetCurrentPiece = (ctx) => ctx.state.pieces[ctx.state.currentPiece];
const GetCurrentDay = (ctx) =>
  ctx.state.pieces[ctx.state.currentPiece].currentDay;
const GetCurrentSession = (ctx) =>
  ctx.state.pieces[ctx.state.currentPiece].currentSession;
const GetSession = (ctx, pieceNum, dayNum, sessionNum) =>
  ctx.state.pieces[pieceNum].plan[dayNum][sessionNum];

const UpdateCurrentDay = (state, val) => {
  const newState = _.cloneDeep(state);
  newState.pieces[newState.currentPiece].currentDay = val;
  return newState;
};

const UpdateSession = (state, val) => {
  const newState = _.cloneDeep(state);
  newState.pieces[newState.currentPiece].currentSession = val;
  // newState.tempoPercent = 
  return newState;
};

const getCurrentDayFromState = (state) =>
  state.pieces[state.currentPiece].currentDay;

// FIXME ensure min < max
const LimitMaxMin = (value, min, max) => {
  if (value > max) return max;
  if (value < min) return min;
  return value;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'incTempoPercent':
      return Object.assign({}, state, {
        tempoPercent: LimitMaxMin(state.tempoPercent + action.payload, 0, 100),
      });
    case 'incTempoTarget': {
      const j = 9;
      return Object.assign({}, state, {
        tempoTarget: LimitMaxMin(state.tempoTarget + action.payload, 40, 240),
      });
    }

    //The next three also need to update the TempoTarget/TempoPercent
    case 'nextDay':
      //Also reset currentSession back to 0
      return UpdateCurrentDay(state, getCurrentDayFromState(state) + 1);
    case 'previousDay':
      //Also reset currentSession back to 0
      return UpdateCurrentDay(state, getCurrentDayFromState(state) - 1);
    case 'updateSession':
      return UpdateSession(state, action.payload);
    default:
      console.log('uncaught context state change');
      return state;
  }
};

export default Context;

export {
  GetCurrentPiece,
  GetCurrentDay,
  GetCurrentSession,
  GetSession,
  reducer,
};
