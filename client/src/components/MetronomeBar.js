import React, {useContext} from 'react';
import {css} from '@emotion/core';
import Line from '../assets/line.svg';

import Context from '../Context';

const LINE_COUNT = 40;
const counterArray = Array.from(Array(LINE_COUNT).keys());

import { text } from '../colors';

const MetronomeBar = () => {
  const ctx = useContext(Context)
  const calcLineHeight = (index) => {
    const MAX_HEIGHT = 80;
    const MIN_HEIGHT = 30;
    const HEIGHT_DIFF = MAX_HEIGHT - MIN_HEIGHT;

    // const b = (Math.PI * 2)
    // const a = b * +index / LINE_COUNT;
    // console.log('a', a, b, index, LINE_COUNT)
    // return `${MIN_HEIGHT + HEIGHT_DIFF * Math.sin(a)}px`
    return `${MAX_HEIGHT - HEIGHT_DIFF * Math.sin((Math.PI) * index / LINE_COUNT )}px`
  }

  return (
    <div css={css`
      display: flex;
      align-items: flex-start;
      margin-top: 15px;
    `}>
      {counterArray.map((i) => (
        <Line stroke={text(ctx)} height={calcLineHeight(i)} width="10px" key={i} id={`L${i}`} />
      ))}
    </div>
  );
};

export default MetronomeBar;
