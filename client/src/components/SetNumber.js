import React, { useState } from 'react';
import { css } from '@emotion/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare as plusIcon, faMinusSquare as minusIcon} from '@fortawesome/free-solid-svg-icons';

const SetNumber = ({ value, setValue, min = 0, max = 200, units }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const increment = () => {
    setValue((oldValue) => (oldValue < max ? oldValue + 1 : oldValue));
  };
  const decrement = () => {
    setValue((oldValue) => (oldValue > min ? oldValue - 1 : oldValue));
  };

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
      onMouseLeave={() => {
        console.log('leave');
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
          {value}
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
