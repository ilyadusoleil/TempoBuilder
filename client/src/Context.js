import { createContext } from 'react';
import _ from 'lodash';

const Context = createContext({});

const GetCurrentPiece = (ctx) => ctx.state.pieces[ctx.state.currentPiece];
const GetCurrentDay = (ctx) => GetCurrentPiece(ctx).currentDay;
const GetCurrentSessionIdx = (ctx) => GetCurrentPiece(ctx).currentSession;
const GetCurrentSessionDetailsList = (ctx) =>
  GetCurrentPiece(ctx).plan[GetCurrentDay(ctx)];
const GetCurrentSessionDetails = (ctx) =>
  GetCurrentPiece(ctx).plan[GetCurrentDay(ctx)][GetCurrentSessionIdx(ctx)];
const GetSession = (ctx, pieceNum, dayNum, sessionNum) =>
  ctx.state.pieces[pieceNum].plan[dayNum][sessionNum];

const GetCurrentSessionImageIndex = (ctx) => {
  const letter = GetCurrentSessionDetails(ctx).letter.toLowerCase();

  const MAP = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
  };
  if (MAP[letter] !== undefined) {
    return MAP[letter];
  } else {
    console.log('unrecognised (inc "all") letter');
    return -1;
  }
};

const getCurrentPieceFromState = (state) => state.pieces[state.currentPiece];

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

// FIXME ensure min < max
const LimitMaxMin = (value, min, max) => {
  if (value > max) return max;
  if (value < min) return min;
  return value;
};

const UpdateCurrentDay = (state, val) => {
  const newState = _.cloneDeep(state);
  newState.pieces[newState.currentPiece].currentDay = LimitMaxMin(
    val,
    0,
    getCurrentPieceFromState(newState).plan.length - 1
  );

  return UpdateSession(newState, 0);
};

const AddNewPiece = (state, newPiece) => {
  const newState = _.cloneDeep(state);
  const newPieceCopy = _.cloneDeep(newPiece);
  newState.pieces.push(newPieceCopy);
  return newState;
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
    case 'updateDay':
      return UpdateCurrentDay(state, action.payload);
    case 'updateSession':
      return UpdateSession(state, action.payload);
    case 'updateCurrentPiece':
      return Object.assign({}, state, {
        currentPiece: action.payload, //LimitMaxMin(action.payload, 0, state.pieces.length - 1),
      });

    case 'setUser':
      return Object.assign({}, state, { user: { ...action.payload } });
    case 'setAuthError':
      return Object.assign({}, state, { authError: action.payload }); //TODO check this isn't an object
    case 'setIsAuthenticated':
      return Object.assign({}, state, { isAuthenticated: action.payload });
    case 'setIsLoggedIn':
      return Object.assign({}, state, { isLoggedIn: action.payload });

    case 'setDisplayState':
      return Object.assign({}, state, { displayState: action.payload });

    case 'addNewPiece':
      return AddNewPiece(state, action.payload);
    default:
      console.log('uncaught context state change');
      return state;
  }
};

export default Context;

export {
  GetCurrentPiece,
  GetCurrentDay,
  GetCurrentSessionIdx,
  GetCurrentSessionDetailsList,
  GetCurrentSessionDetails,
  GetCurrentSessionImageIndex,
  GetSession,
  reducer,
};
