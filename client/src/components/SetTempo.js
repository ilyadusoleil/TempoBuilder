import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../Context';

import SetNumber from './SetNumber';
import { text } from '../colors';
const SetTempo = () => {
  const ctx = useContext(Context);
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
          color: ${text(ctx)};
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
