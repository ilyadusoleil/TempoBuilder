import React from 'react';
import { css } from '@emotion/core';

import SetNumber from './SetNumber';

const SetTempo = ({
  tempoPercent,
  setTempoPercent,
  tempoTarget,
  setTempoTarget,
}) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <SetNumber
        value={tempoPercent}
        setValue={setTempoPercent}
        units="%"
        max={100}
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
        value={tempoTarget}
        setValue={setTempoTarget}
        units="bpm"
        max={200}
      />
    </div>
  );
};

export default SetTempo;
