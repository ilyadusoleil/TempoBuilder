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
            ctx.dispatch({ type: 'setDisplayStateEdit', payload: i }); // TODO consider updating payload to _id instead
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
      <button
        css={css`
          margin: 20px;
          margin-bottom: auto;
        `}
        onClick={() => {
          console.log('log out');
          window.open('http://localhost:3000/auth/logout', '_self');
          ctx.dispatch({type: 'logout'})
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default SidebarContent;
