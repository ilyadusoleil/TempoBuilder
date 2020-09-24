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

const getCurrentDayFromState = (state) =>
  state.pieces[state.currentPiece].currentDay;

const getCurrentSessionNumFromState = (state) =>
  state.pieces[state.currentPiece].currentSession;

const getCurrentSessionFromState = (state) =>
  state.pieces[state.currentPiece].plan[getCurrentDayFromState(state)][
    getCurrentSessionNumFromState(state)
  ];

  const UpdateSession = (state, val) => {
    const newState = _.cloneDeep(state);
    newState.pieces[newState.currentPiece].currentSession = val;
    newState.tempoPercentManual = getCurrentSessionFromState(newState).percent;
    newState.tempoTargetManual =
    newState.pieces[newState.currentPiece].tempoTarget;
    return newState;
  };
  
  const UpdateCurrentDay = (state, val) => {
    const newState = _.cloneDeep(state);
    newState.pieces[newState.currentPiece].currentDay = val;
    
    return UpdateSession(newState, 0);
  };
// FIXME ensure min < max
const LimitMaxMin = (value, min, max) => {
  if (value > max) return max;
  if (value < min) return min;
  return value;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'incTempoPercentManual':
      return Object.assign({}, state, {
        tempoPercentManual: LimitMaxMin(
          state.tempoPercentManual + action.payload,
          0,
          100
        ),
      });
    case 'incTempoTargetManual':
      return Object.assign({}, state, {
        tempoTargetManual: LimitMaxMin(
          state.tempoTargetManual + action.payload,
          40,
          240
        ),
      });

    //The next three also need to update the tempoTargetManual/tempoPercentManual
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
