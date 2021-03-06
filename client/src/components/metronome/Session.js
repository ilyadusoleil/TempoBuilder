import React, { useContext, useEffect } from 'react';
import { css } from '@emotion/core';

import Context, {
  GetSession,
  GetCurrentPiece,
  GetCurrentSessionIdx,
} from '../../Context';

import { updateCurrentSession } from '../../ApiClient';
import { primary, secondary, text } from '../../colors';
import { BUTTON_HEIGHT, BORDER_RADIUS } from '../../constants';

const Session = ({ piece, day, session }) => {
  const ctx = useContext(Context);
  const bkColor = () => {
    if (ctx.state.pieces[ctx.state.currentPiece].currentSession == session) {
      return secondary(ctx);
    } else {
      return primary(ctx);
    }
  };

  const sessionInfo = GetSession(ctx, piece, day, session);

  const handleClick = () => {
    ctx.dispatch({ type: 'updateSession', payload: session });
    updateCurrentSession(GetCurrentPiece(ctx)._id, session);
  };

  useEffect(() => {
    // This updates the tempo-percent/target to be the current session
    if (session === GetCurrentSessionIdx(ctx)) {
      ctx.dispatch({ type: 'updateSession', payload: session });
    }
  }, []);

  const SectionString = (idx) => {
    if (idx < 0) return 'Full run';
    return `Section ${idx + 1}`;
  };

  return (
    <button
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 8px;
        border: none;
        background: ${bkColor()};
        cursor: pointer;

        border-radius: ${BORDER_RADIUS};
        padding: 4px 10px;

        height: ${BUTTON_HEIGHT};
        color: ${text(ctx)};
      `}
      onClick={handleClick}
    >
      {SectionString(sessionInfo.section)} - {sessionInfo.repetitions} time
      {sessionInfo.repetitions > 1 ? 's' : ''} at {sessionInfo.percent}% tempo
    </button>
  );
};

export default Session;
