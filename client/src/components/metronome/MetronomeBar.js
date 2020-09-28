import React, {useContext} from 'react';
import {css} from '@emotion/core';
import Line from '../../assets/line.svg';

import Context from '../../Context';

const LINE_COUNT = 36;
const counterArray = Array.from(Array(LINE_COUNT).keys());

import { text } from '../../colors';

const MetronomeBar = () => {
  const ctx = useContext(Context)
  const calcLineHeight = (index) => {
    const MAX_HEIGHT = 80;
    const MIN_HEIGHT = 30;
    const HEIGHT_DIFF = MAX_HEIGHT - MIN_HEIGHT;

    return `${MAX_HEIGHT - HEIGHT_DIFF * Math.sin((Math.PI) * index / LINE_COUNT )}px`
  }

  return (
    <div css={css`
      display: flex;
      align-items: flex-start;
      margin-top: 15px;
    `}>
      {counterArray.map((i) => (
        <Line stroke={text(ctx)} fill={text(ctx)} height={calcLineHeight(i)} width="10px" key={i} id={`L${i}`} />
      ))}
    </div>
  );
};

export default MetronomeBar;
