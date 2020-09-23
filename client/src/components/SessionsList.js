import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';

import Session from './Session';

const SessionsList = ({
  sessions,
  currentDay,
  setTempoPercent,
  setCurrentDay,
}) => {
  const [currentSession, setCurrentSession] = useState(0);

  const resetSession = (newCurrentDay) => {
    setCurrentSession(0);
    setTempoPercent(sessions[newCurrentDay][0].percent);
  };

  const prevDay = () => {
    currentDay > 0
      ? setCurrentDay((prevDay) => {
          const newVal = prevDay - 1;
          resetSession(newVal);
          return newVal;
        })
      : 0;
    resetSession(currentDay);
  };

  const nextDay = () => {
    currentDay < sessions.length - 1
      ? setCurrentDay((prevDay) => {
          const newVal = prevDay + 1;
          resetSession(newVal);
          return newVal;
        })
      : sessions.length - 1;
  };

  useEffect(() => {
    resetSession(currentDay);
  }, [])

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <button onClick={prevDay}>Previous</button>
      {sessions[currentDay].map((session, i) => (
        <Session
          key={i}
          sectionLetter={session.letter}
          repetitions={session.repetitions}
          percent={session.percent}
          isCurrent={i === currentSession}
          onClick={() => {
            setTempoPercent(session.percent);
            setCurrentSession(i);
          }}
        />
      ))}
      <button onClick={nextDay}>Next</button>
    </div>
  );
};

export default SessionsList;
