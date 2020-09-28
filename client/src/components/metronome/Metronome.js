import React, { useState, useEffect, useRef, useContext } from 'react';
import { css } from '@emotion/core';

import MetronomeWorker from './MetronomeWorker';
import { Animate } from './MetronomeHelper';

import Context, {
  GetCurrentPiece,
  GetCurrentSessionImageIndex,
} from '../../Context';

import CurrentPlanHeader from './CurrentPlanHeader';
import SessionsList from './SessionsList';
import SetTempo from './SetTempo';
import MetronomeBar from './MetronomeBar';
import PlayButton from './PlayButton';

import { MEDIA_QUERY_WIDTH } from '../../constants';
import { background, NightModeTransitionTime } from '../../colors';

let timerWorker = new Worker(MetronomeWorker);

const Metronome = () => {
  const ctx = useContext(Context);

  const [isPlaying, setIsPlaying] = useState(false);

  const tempoPercentRef = useRef(ctx.state.tempoPercentManual);
  tempoPercentRef.current = ctx.state.tempoPercentManual;

  const tempoTargetRef = useRef(ctx.state.tempoTargetManual);
  tempoTargetRef.current = ctx.state.tempoTargetManual;

  let currentBeat = 0;
  let audioContext = null;

  const calculateTempo = () =>
    Math.floor((tempoPercentRef.current * tempoTargetRef.current) / 100);

  const tick = (beat, time) => {
    if (beat == 0) {
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
    const currentTempo = calculateTempo();
    const beatsPerTick = 60000 / 25 / currentTempo;
    tick(currentBeat, audioContext.currentTime);

    currentBeat++;
    if (currentBeat >= beatsPerTick) {
      currentBeat = 0;
    }
  };

  const start = () => {
    if (!audioContext)
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    currentBeat = 0;
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
        align-items: center;
        flex-direction: column;
        padding-top: 20px;
        background: ${background(ctx)};
        transition: ${NightModeTransitionTime};
        ${MEDIA_QUERY_WIDTH} {
          align-items: flex-start;
          flex-direction: row;
          justify-content: space-around;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px;
          padding-top: 0px;
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
      </div>
      <div
        css={css`
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        {GetCurrentPiece(ctx) &&
          GetCurrentPiece(ctx).images[GetCurrentSessionImageIndex(ctx)] && (
            <img
              src={
                GetCurrentPiece(ctx).images[GetCurrentSessionImageIndex(ctx)]
              }
              width="100%"
              alt="Sheet Music!"
              css={css`
                filter: invert(${ctx.state.isNightMode ? 1 : 0});
                transition: filter ${NightModeTransitionTime};
              `}
            />
          )}
        {GetCurrentPiece(ctx) &&
          GetCurrentSessionImageIndex(ctx) === -1 &&
          GetCurrentPiece(ctx).images.map(
            (image, i) =>
              image && (
                <img
                  key={i}
                  src={image}
                  width="100%"
                  alt="Sheet Music!"
                  css={css`
                    filter: invert(${ctx.state.isNightMode ? 1 : 0});
                    transition: filter ${NightModeTransitionTime};
                  `}
                />
              )
          )}
      </div>
    </div>
  );
};

export default Metronome;
