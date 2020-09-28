import { createContext } from 'react';
import _ from 'lodash';

const Context = createContext({});
// Helper functions for use within components
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
  const section = GetCurrentSessionDetails(ctx).section;

  if (section >= -1 && section < GetCurrentPiece(ctx).sectionsCount) {
    return section;
  } else {
    // eslint-disable-next-line no-console
    console.log('unrecognised section index', section);
    return -1;
  }
};

// Helper functions for internal use within this file
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

// TODO ensure min < max
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

const DeletePiece = (state, deletePieceId) => {
  const newState = _.cloneDeep(state);
  const removeIndex = newState.pieces.findIndex(
    (piece) => piece._id === deletePieceId
  );
  if (removeIndex > -1) {
    newState.pieces.splice(removeIndex, 1);
  }

  // If removing this index will affect the 'current piece' index, modify this index
  if (removeIndex === newState.currentPiece) {
    newState.currentPiece = 0; // reset if selected piece is the one to be removed
  } else if (removeIndex > newState.currentPiece) {
    newState.currentPiece -= 1; // Keep the same piece selected if a different piece is being deleted
  }
  return newState;
};

const UpdatePiece = (state, updatePiece) => {
  const newState = _.cloneDeep(state);

  // find piece with the same _id
  const pieceIndex = state.pieces.findIndex(
    (piece) => piece._id === updatePiece._id
  );
  if (pieceIndex == -1) {
    // eslint-disable-next-line no-console
    console.log('Unable to locally update piece');
    return newState;
  }
  newState.pieces[pieceIndex] = updatePiece;
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
    case 'logout':
      return Object.assign({}, state, {
        isLoggedIn: false,
        isAuthenticated: false,
        user: {},
        displayState: 'home',
        authError: null,
      });

    case 'setDisplayState':
      return Object.assign({}, state, { displayState: action.payload });
    case 'setDisplayStateEdit':
      return Object.assign({}, state, {
        displayState: 'edit',
        editIdx: action.payload,
      });

    case 'addNewPiece':
      return AddNewPiece(state, action.payload);
    case 'deletePiece':
      return DeletePiece(state, action.payload);
    case 'updatePiece':
      return UpdatePiece(state, action.payload);

    case 'toggleNightMode':
      return Object.assign({}, state, { isNightMode: !state.isNightMode });

    default:
      // eslint-disable-next-line no-console
      console.log('Uncaught context state change');
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
