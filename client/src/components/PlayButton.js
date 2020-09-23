import React from 'react';
import {css} from '@emotion/core'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

const PlayButton = ({ isPlaying, handleClick }) => {
  return (
    <button
    css={css`
      border: none;
      background: white;
      margin-top: -30px;
      cursor: pointer;
      &:hover {
        transform: scale(1.3);
      }
    `}
      onClick={handleClick}
    >
      <FontAwesomeIcon color='#505050' size='4x' icon={isPlaying ? faStopCircle : faPlayCircle} />
    </button>
  );
};

export default PlayButton;
