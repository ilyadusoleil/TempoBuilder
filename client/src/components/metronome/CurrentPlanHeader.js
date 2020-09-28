import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context, { GetCurrentPiece } from '../../Context';
import { text } from '../../colors';

const CurrentPlanHeader = () => {
  const ctx = useContext(Context);
  const currentPiece = GetCurrentPiece(ctx);
  return (
    <div
      css={css`
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
        color: ${text(ctx)};
      `}
    >
      &quot;{currentPiece.name}&quot; - Day {currentPiece.currentDay + 1}
    </div>
  );
};

export default CurrentPlanHeader;
