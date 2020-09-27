import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';

import SidebarPiece from './SidebarPiece';
import SidebarButton from './SidebarButton';

import { updateCurrentPiece, deletePiece } from '../../ApiClient';

import { background, text } from '../../colors';


const SidebarContent = () => {
  const ctx = useContext(Context);

  const handleNewPiece = () => {
    console.log('form');
    ctx.dispatch({ type: 'setDisplayState', payload: 'form' });
  };

  const handleLogout = () => {
    console.log('log out');
    window.open('http://localhost:3000/auth/logout', '_self');
    ctx.dispatch({ type: 'logout' });
  };

  return (
    <div
      css={css`
        width: 200px;
        display: flex;
        flex-direction: column;
        padding: 0px 20px;
        background: ${background(ctx)};
        height: 100vh;
      `}
    >
      <div
        css={css`
          font-size: 25px;
          margin: 20px;
          margin-top: 30px;
          align-self: center;
          color: ${text(ctx)};
        `}
      >
        Hi {ctx.state.user?.firstName}
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
      <div
        css={css`
          margin-top: auto;
          margin-bottom: 30px;

          display: flex;
          flex-direction: column;
          align-items: stretch;
        `}
      >
        <SidebarButton onClick={handleNewPiece} text="New Piece" />
        <SidebarButton onClick={handleLogout} text="Logout" />
      </div>
    </div>
  );
};

export default SidebarContent;
