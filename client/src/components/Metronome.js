import React from 'react';

import CurrentPlanHeader from './CurrentPlanHeader';
import SetTempo from './SetTempo';
import MetronomeBar from './MetronomeBar';
import PlayButton from './PlayButton';

const Metronome = () => {
  return (
    <div>
      <CurrentPlanHeader name="Arban 1" day="2"/>
      <SetTempo tempoTarget={120} tempoPercent={80} />
      <MetronomeBar />
      <PlayButton />
    </div>
  );
};

export default Metronome;
