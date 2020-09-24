import React, { useEffect, useContext } from 'react';
import { css } from '@emotion/core';

import Session from './Session';

import Context from '../Context'

const SessionsList = () => {
  const ctx = useContext(Context);

  // const resetSession = (newCurrentDay) => {
  //   setCurrentSession(0);
  //   setTempoPercent(sessions[newCurrentDay][0].percent);
  // };

  const prevDay = () => {
    ctx.dispatch({type: 'previousDay'});
  };

  const nextDay = () => {
    ctx.dispatch({type: 'nextDay'});
  };

  useEffect(() => {
    // resetSession(currentDay);
  }, [])

const getCurrentDay = () => ctx.state.pieces[ctx.state.currentPiece].currentDay;

const getCurrentDaySession = () => ctx.state.pieces[ctx.state.currentPiece].plan[getCurrentDay()]

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <button onClick={prevDay}>Previous</button>
      {getCurrentDaySession().map((session, i) => (
        <Session
          key={i}
          piece={ctx.state.currentPiece}
          day={getCurrentDay()}
          session={i}
        />
      ))}
      <button onClick={nextDay}>Next</button>
    </div>
  );
};

export default SessionsList;


// sectionLetter={session.letter}
// repetitions={session.repetitions}
// percent={session.percent}
// isCurrent={i === currentSession}
// onClick={() => {
//   setTempoPercent(session.percent);
//   setCurrentSession(i);
// }}