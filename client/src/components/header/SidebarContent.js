import React from 'react';
import {css} from '@emotion/core';



import SidebarPiece from './SidebarPiece';

const pieces = [
  { name: 'Arban 1', progressDays: '2', totalDays: '12' },
  { name: 'Charlier 2', progressDays: '4', totalDays: '12' },
];

const SidebarContent = () => {
  return (
    <div css={css`
      width: 200px;
      display: flex;
      flex-direction: column;
      padding: 20px;
    `}>
      <div css={css`
        font-size: 25px;
        margin: 20px;
        align-self: center;
      `}>Hi Hamish</div>
      {pieces.map((piece, i) => <SidebarPiece
        key = {i}
          name={piece.name}
          progressDays={piece.progressDays}
          totalDays={piece.totalDays}
        />
      )}

    </div>
  );
};

export default SidebarContent;
