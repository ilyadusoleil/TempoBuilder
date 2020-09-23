import React from 'react';
import { css } from '@emotion/core';

const CurrentPlanHeader = ({ name, day }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div>{name}</div>
      <div>Day {day}</div>
    </div>
  );
};

export default CurrentPlanHeader;
