import React, {useContext} from 'react'
import {css} from '@emotion/core';

import Context, {GetSession} from '../Context'

const Session = ({piece, day, session}) => {
  const ctx = useContext(Context);
  const bkColor = () => {
    if (ctx.state.pieces[ctx.state.currentPiece].currentSession == session) {
      return 'peru';
    } else {
      return 'lightgray'
    }
  }

  const sessionInfo = GetSession(ctx, piece, day, session)

  const handleClick = () => {
    ctx.dispatch({type: 'updateSession', payload: session})
  }

  return (
    <button css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px;
      border: none;
      background: ${bkColor()};
      cursor: pointer;

    `}
     onClick={handleClick}
    >
      <div css={css`
        font-size: 20px;
      `}>Section {sessionInfo.letter}</div>
      <div css={css`
        font-size: 25px;
      `}>x{sessionInfo.repetitions}</div>
      <div css={css`
        font-size: 15px;
      `}>{sessionInfo.percent}%</div>

    </button>
  )
}

export default Session;