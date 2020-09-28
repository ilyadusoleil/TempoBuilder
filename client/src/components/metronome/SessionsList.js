import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Session from './Session';

import Context, {
  GetCurrentDay,
  GetCurrentPiece,
  GetCurrentSessionDetailsList,
} from '../../Context';

import { updateCurrentDay } from '../../ApiClient';
import { primary, secondary, text } from '../../colors';

const buttonStyling = (ctx) => css`
  cursor: pointer;
  height: 50px;
  width: 100px;
  margin: 0px 15px;
  border: none;
  border-radius: 10px;
  background: ${primary(ctx)};
  color: ${text(ctx)};
  &:hover {
    background: ${secondary(ctx)};
  }
`;

const SessionsList = () => {
  const ctx = useContext(Context);

  const prevDay = () => {
    const currentDay = GetCurrentDay(ctx);
    const newCurrentDay = currentDay > 0 ? currentDay - 1 : currentDay;

    ctx.dispatch({ type: 'updateDay', payload: newCurrentDay });
    updateCurrentDay(GetCurrentPiece(ctx)._id, newCurrentDay);
  };

  const isNotLastDay = () => {
    const currentDay = GetCurrentDay(ctx);
    return currentDay >= GetCurrentSessionDetailsList(ctx).length - 1;
  };

  const nextDay = () => {
    const currentDay = GetCurrentDay(ctx);
    const newCurrentDay = isNotLastDay() ? currentDay + 1 : currentDay;
    ctx.dispatch({ type: 'updateDay', payload: newCurrentDay });
    updateCurrentDay(GetCurrentPiece(ctx)._id, newCurrentDay);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: stretch;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        `}
      >
        {GetCurrentDay(ctx) > 0 && (
          <button css={buttonStyling(ctx)} onClick={prevDay}>
            Previous
          </button>
        )}
        {isNotLastDay() && (
          <button css={buttonStyling(ctx)} onClick={nextDay}>
            Next
          </button>
        )}
      </div>
      {GetCurrentSessionDetailsList(ctx).map((session, i) => (
        <Session
          key={i}
          piece={ctx.state.currentPiece}
          day={GetCurrentDay(ctx)}
          session={i}
        />
      ))}
    </div>
  );
};

export default SessionsList;
