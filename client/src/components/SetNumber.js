import React from 'react';
import { css } from '@emotion/core';

const SetNumber = ({ value, setValue, min = 0, max = 200, units }) => {
  const increment = () => {
    setValue(oldValue => oldValue < max ? oldValue + 1 : oldValue)
  }
  const decrement = () => {
    setValue(oldValue => oldValue > min ? oldValue - 1 : oldValue)
  }

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>

      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        {value} {units}
      </div>
    </div>
  );
};

export default SetNumber;
