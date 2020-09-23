import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/core';

import MetronomeWorker from './MetronomeWorker';

import CurrentPlanHeader from './CurrentPlanHeader';
import SetTempo from './SetTempo';
import MetronomeBar from './MetronomeBar';
import PlayButton from './PlayButton';

let timerWorker = new Worker(MetronomeWorker);
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [tempoPercent, setTempoPercent] = useState(80);
  const tempoPercentRef = useRef(tempoPercent);
  tempoPercentRef.current = tempoPercent;
  
  const [tempoTarget, setTempoTarget] = useState(120);
  const tempoTargetRef = useRef(tempoTarget);
  tempoTargetRef.current = tempoTarget;

  let isLeft = true;
  let currentBeat = 0;
  let nextNoteTime = 0;

  const calculateTempo = () => Math.floor((tempoPercentRef.current * tempoTargetRef.current) / 100);

  const tick = (beat, time) => {
    if (beat == 0) {
      console.log('tick');

      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const NOTE_LENGTH = 0.1;

      osc.start(time);
      osc.stop(time + NOTE_LENGTH);
    }
  };

  const runScheduler = () => {
    // while (
    //   this.nextNoteTime <
    //   this.audioContext.currentTime + SCHEDULE_AHEAD_TIME
    // ) {

    const currentTempo = calculateTempo();
    console.log('currentTempo', currentTempo);
    const beatsPerTick = 60000 / 25 / currentTempo;
    tick(currentBeat, audioContext.currentTime);
    const SECONDS_IN_MINUTE = 60;
    const secondsPerBeat = SECONDS_IN_MINUTE / currentTempo;
    nextNoteTime += secondsPerBeat / beatsPerTick;

    currentBeat++;
    if (currentBeat >= beatsPerTick) {
      currentBeat = 0;
    }
  };

  const start = () => {
    currentBeat = 0;
    nextNoteTime = audioContext.currentTime;

    console.log('start');

    timerWorker.postMessage({
      action: 'START',
    });
  };

  const stop = () => {
    timerWorker.postMessage({
      action: 'STOP',
    });
  };

  const toggleIsPlaying = () => {
    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      start();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    timerWorker.onmessage = (event) => {
      if (event.data === 'TICK') {
        runScheduler();
      }
    };

    return function () {
      timerWorker.postMessage({
        action: 'STOP', //ACTION_STOP,
      });
    };
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <CurrentPlanHeader name="Arban 1" day="2" />
      <SetTempo
        tempoPercent={tempoPercent}
        setTempoPercent={setTempoPercent}
        tempoTarget={tempoTarget}
        setTempoTarget={setTempoTarget}
      />
      <MetronomeBar />
      <PlayButton isPlaying={isPlaying} handleClick={toggleIsPlaying} />
    </div>
  );
};

export default Metronome;
