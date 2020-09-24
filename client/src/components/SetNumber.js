import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../Context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare as plusIcon, faMinusSquare as minusIcon} from '@fortawesome/free-solid-svg-icons';

/**
 * value - key of value in context
 * action - na,e
 */
const SetNumber = ({ value, action, units }) => {
  const ctx = useContext(Context);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const increment = () => {
    ctx.dispatch({type: action, payload: 1})
    // setValue((oldValue) => (oldValue < max ? oldValue + 1 : oldValue));
  };
  const decrement = () => {
    ctx.dispatch({type: action, payload: -1})
    // setValue((oldValue) => (oldValue > min ? oldValue - 1 : oldValue));
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
      onMouseLeave={() => {
        if (isButtonVisible) {
          setIsButtonVisible(false);
        }
      }}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          display: ${isButtonVisible ? 'flex' : 'none'};
          margin-right: 4px;
        `}
      >
        <FontAwesomeIcon
          css={css`
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
            }
          `}
          size="2x"
          onClick={increment}
          icon={plusIcon}
        />
        <FontAwesomeIcon
          css={css`
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
            }
          `}
          size="2x"
          onClick={decrement}
          icon={minusIcon}
        />
      </div>

      <div
        css={css`
          display: flex;
          align-items: flex-end;

          padding: 30px 0px;
        `}
        onMouseEnter={() => {
          if (!isButtonVisible) {
            setIsButtonVisible(true);
          }
        }}
      >
        <span
          css={css`
            font-weight: 600;
            font-size: 20px;
          `}
        >
          {ctx.state[value]}
        </span>
        <span
          css={css`
            font-size: 15px;
            margin-left: 5px;
          `}
        >
          {units}
        </span>
      </div>
    </div>
  );
};

export default SetNumber;
