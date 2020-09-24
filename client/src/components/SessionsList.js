import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Session from './Session';

import Context, {GetCurrentDay, GetCurrentSessionDetailsList} from '../Context'

const SessionsList = () => {
  const ctx = useContext(Context);


  const prevDay = () => {
    ctx.dispatch({type: 'previousDay'});
  };

  const nextDay = () => {
    ctx.dispatch({type: 'nextDay'});
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