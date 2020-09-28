import React, {useContext} from 'react';
import {css} from '@emotion/core'

import Context from '../../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import { text } from '../../colors';

const PlayButton = ({ isPlaying, handleClick }) => {
  const ctx = useContext(Context);
  return (
    <button
    css={css`
      border: none;
      margin-top: -30px;
      background: #00000000;
      cursor: pointer;
      &:hover {
        transform: scale(1.3);
      }
    `}
      onClick={handleClick}
    >
      <FontAwesomeIcon color={text(ctx)} size='4x' icon={isPlaying ? faStopCircle : faPlayCircle} />
    </button>
  );
};

export default PlayButton;
