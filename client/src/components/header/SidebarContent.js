import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';

import SidebarPiece from './SidebarPiece';

import { updateCurrentPiece, deletePiece } from '../../ApiClient';

const SidebarContent = () => {
  const ctx = useContext(Context);

  return (
    <div
      css={css`
        width: 200px;
        display: flex;
        flex-direction: column;
        padding: 20px;
      `}
    >
      <div
        css={css`
          font-size: 25px;
          margin: 20px;
          align-self: center;
        `}
      >
        Hi Hamish
      </div>
      {ctx.state.pieces.map((piece, i) => (
        <SidebarPiece
          key={i}
          name={piece.name}
          progressDays={piece.currentDay + 1}
          totalDays={piece.plan.length}
          onClick={() => {
            updateCurrentPiece(i);
            ctx.dispatch({ type: 'updateCurrentPiece', payload: i });
          }}
          onEdit={() => {
            console.log('ediitttt woohoo');
          }}
          onTrash={() => {
            console.log('trash', piece._id);

            ctx.dispatch({ type: 'deletePiece', payload: piece._id });
            deletePiece(piece._id);

            //TODO if deleting a piece, changes the currentPiece, need to update this index on the server as well.
          }}
        />
      ))}
      <button
        onClick={() => {
          console.log('form');
          ctx.dispatch({ type: 'setDisplayState', payload: 'form' });
        }}
      >
        New Piece
      </button>
    </div>
  );
};

export default SidebarContent;
