import React from 'react';

const PlayButton = ({ isPlaying, handleClick }) => {
  return (
    <button
      onClick={handleClick}
    >
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
};

export default PlayButton;
