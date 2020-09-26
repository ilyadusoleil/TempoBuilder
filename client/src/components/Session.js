import React, { useContext, useEffect } from 'react';
import { css } from '@emotion/core';

import Context, {
  GetSession,
  GetCurrentPiece,
  GetCurrentSessionIdx,
} from '../Context';

import { updateCurrentSession } from '../ApiClient';

const Session = ({ piece, day, session }) => {
  const ctx = useContext(Context);
  const bkColor = () => {
    if (ctx.state.pieces[ctx.state.currentPiece].currentSession == session) {
      return 'peru';
    } else {
      return 'lightgray';
    }
  };

  const sessionInfo = GetSession(ctx, piece, day, session);

  const handleClick = () => {
    ctx.dispatch({ type: 'updateSession', payload: session });
    console.log('click', GetCurrentPiece(ctx));
    updateCurrentSession(GetCurrentPiece(ctx)._id, session);
  };

  useEffect(() => {
    // This updates the tempo-percent/target to be the current session
    if (session === GetCurrentSessionIdx(ctx)) {
      ctx.dispatch({ type: 'updateSession', payload: session });
    }
  }, []);

  return (
    <button
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px;
        border: none;
        background: ${bkColor()};
        cursor: pointer;

        border-radius: 5px;
        padding: 2px 10px;
        font-size: 20px;
        height: 40px;
      `}
      onClick={handleClick}
    >
      <div
        css={css`
          
        `}
      >
        Section {sessionInfo.letter.toUpperCase()} - {sessionInfo.repetitions} time
        {sessionInfo.repetitions > 1 ? 's' : ''} at {sessionInfo.percent}% tempo
      </div>
    </button>
  );
};

export default Session;
