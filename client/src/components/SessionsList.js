import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Session from './Session';

import Context, {
  GetCurrentDay,
  GetCurrentPiece,
  GetCurrentSessionDetailsList,
} from '../Context';

import { updateCurrentDay} from '../ApiClient';

const SessionsList = () => {
  const ctx = useContext(Context);

  const prevDay = () => {
    const currentDay = GetCurrentDay(ctx);
    const newCurrentDay = currentDay > 0 ? currentDay - 1 : currentDay;


    // ctx.dispatch({type: 'previousDay'});
    ctx.dispatch({ type: 'updateDay', payload: newCurrentDay });
    updateCurrentDay(GetCurrentPiece(ctx)._id, newCurrentDay);
    // updateCurrentSession((GetCurrentPiece(ctx)._id, 0));
  };

  const nextDay = () => {
    // ctx.dispatch({type: 'nextDay'});
    const currentDay = GetCurrentDay(ctx);
    const newCurrentDay =
      currentDay >= GetCurrentSessionDetailsList(ctx).length - 1
        ? currentDay + 1
        : currentDay;
    ctx.dispatch({ type: 'updateDay', payload: newCurrentDay });
    updateCurrentDay(GetCurrentPiece(ctx)._id, newCurrentDay);
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <button onClick={prevDay}>Previous</button>
      {GetCurrentSessionDetailsList(ctx).map((session, i) => (
        <Session
          key={i}
          piece={ctx.state.currentPiece}
          day={GetCurrentDay(ctx)}
          session={i}
        />
      ))}
      <button onClick={nextDay}>Next</button>
    </div>
  );
};

export default SessionsList;
