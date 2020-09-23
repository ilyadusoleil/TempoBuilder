import React, { useState } from 'react';
import {css} from '@emotion/core';

import CurrentPlanHeader from './CurrentPlanHeader';
import SetTempo from './SetTempo';
import MetronomeBar from './MetronomeBar';
import PlayButton from './PlayButton';

const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempoPercent, setTempoPercent] = useState(80);
  const [tempoTarget, setTempoTarget] = useState(120);

  return (
    <div css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}>
      <CurrentPlanHeader name="Arban 1" day="2" />
      <SetTempo
        tempoPercent={tempoPercent}
        setTempoPercent={setTempoPercent}
        tempoTarget={tempoTarget}
        setTempoTarget={setTempoTarget}
      />
      <MetronomeBar />
      <PlayButton isPlaying={isPlaying} handleClick={setIsPlaying} />
    </div>
  );
};

export default Metronome;
