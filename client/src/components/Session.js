import React from 'react'
import {css} from '@emotion/core';

const Session = ({sectionLetter, repetitions, percent, onClick, isCurrent}) => {
  const bkColor = () => {
    if (isCurrent) {
      return 'peru';
    } else {
      return 'lightgray'
    }
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

    `} onClick={onClick}
    >
      <div css={css`
        font-size: 20px;
      `}>Section {sectionLetter}</div>
      <div css={css`
        font-size: 25px;
      `}>x{repetitions}</div>
      <div css={css`
        font-size: 15px;
      `}>{percent}%</div>

    </button>
  )
}

export default Session;