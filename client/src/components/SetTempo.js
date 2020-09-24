import React from 'react';
import { css } from '@emotion/core';

import SetNumber from './SetNumber';

const SetTempo = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <SetNumber
        action="incTempoPercentManual"
        value="tempoPercentManual"
        units="%"
      />
      <div
        css={css`
          font-size: 20px;
          margin: 0px 20px;
        `}
      >
        of
      </div>
      <SetNumber
        action="incTempoTargetManual"
        value="tempoTargetManual"
        units="bpm"
      />
    </div>
  );
};

export default SetTempo;
