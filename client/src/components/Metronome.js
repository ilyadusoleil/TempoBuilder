import React, { useState, useEffect, useRef, useContext } from 'react';
import { css } from '@emotion/core';

import MetronomeWorker from './MetronomeWorker';
import { Animate } from './MetronomeHelper';

import Context, {
  GetCurrentPiece,
  GetCurrentSessionImageIndex,
} from '../Context';

import CurrentPlanHeader from './CurrentPlanHeader';
import SessionsList from './SessionsList';
import SetTempo from './SetTempo';
import MetronomeBar from './MetronomeBar';
import PlayButton from './PlayButton';

let timerWorker = new Worker(MetronomeWorker);
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

const Metronome = () => {
  const ctx = useContext(Context);

  const [isPlaying, setIsPlaying] = useState(false);

  const tempoPercentRef = useRef(ctx.state.tempoPercentManual);
  tempoPercentRef.current = ctx.state.tempoPercentManual;

  const tempoTargetRef = useRef(ctx.state.tempoTargetManual);
  tempoTargetRef.current = ctx.state.tempoTargetManual;

  let currentBeat = 0;

  const fileInput = useRef();

  const calculateTempo = () =>
    Math.floor((tempoPercentRef.current * tempoTargetRef.current) / 100);

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

      Animate(calculateTempo());
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
    // const SECONDS_IN_MINUTE = 60;
    // const secondsPerBeat = SECONDS_IN_MINUTE / currentTempo;
    // nextNoteTime += secondsPerBeat / beatsPerTick;

    currentBeat++;
    if (currentBeat >= beatsPerTick) {
      currentBeat = 0;
    }
  };

  const start = () => {
    currentBeat = 0;
    // nextNoteTime = audioContext.currentTime;

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
        action: 'STOP',
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
      {ctx.state.pieces.length > ctx.state.currentPiece ? (
        <div>
          <CurrentPlanHeader />
          <SessionsList />
        </div>
      ) : (
        <div>Create your first practice plan in the menu</div>
      )}
      <SetTempo />

      <MetronomeBar />
      <PlayButton isPlaying={isPlaying} handleClick={toggleIsPlaying} />

      {GetCurrentPiece(ctx) &&
        GetCurrentPiece(ctx).images[GetCurrentSessionImageIndex(ctx)] && (
          <img
            src={GetCurrentPiece(ctx).images[GetCurrentSessionImageIndex(ctx)]}
            width="50%"
            alt="Sheet Music!"
          />
        )}
    </div>
  );
};

export default Metronome;
