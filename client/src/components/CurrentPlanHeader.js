import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context, { GetCurrentPiece } from '../Context';

const CurrentPlanHeader = () => {
  const ctx = useContext(Context);
  const currentPiece = GetCurrentPiece(ctx);
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div>{currentPiece.name}</div>
      <div>Day {currentPiece.currentDay + 1}</div>
    </div>
  );
};

export default CurrentPlanHeader;
