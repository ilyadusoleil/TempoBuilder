import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';

import SidebarPiece from './SidebarPiece';
import SidebarButton from './SidebarButton';

import { updateCurrentPiece, deletePiece } from '../../ApiClient';

import {
  faPlusSquare as newIcon,
  faSignOutAlt as logout,
} from '@fortawesome/free-solid-svg-icons';

import { background, text } from '../../colors';
import { SERVER } from '../../constants.js'

const SidebarContent = (setIsSideBarOpen) => {
  const ctx = useContext(Context);

  const handleNewPiece = () => {
    setIsSideBarOpen(false);
    ctx.dispatch({ type: 'setDisplayState', payload: 'form' });
  };

  const handleLogout = () => {
    setIsSideBarOpen(false);
    window.open(`${SERVER}/auth/logout`, '_self');
    ctx.dispatch({ type: 'logout' });
  };

  return (
    <div
      css={css`
        width: 300px;
        display: flex;
        flex-direction: column;
        padding: 0px;
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
            setIsSideBarOpen(false);
            updateCurrentPiece(i);
            ctx.dispatch({ type: 'updateCurrentPiece', payload: i });
          }}
          onEdit={() => {
            setIsSideBarOpen(false);
            ctx.dispatch({ type: 'setDisplayStateEdit', payload: i }); // TODO: consider updating payload to _id instead
          }}
          onTrash={() => {
            if (confirm(`Are you sure you want to delete ${piece.name}`)) {
              ctx.dispatch({ type: 'deletePiece', payload: piece._id });
              deletePiece(piece._id);
            }

            //TODO: if deleting a piece, changes the currentPiece, need to update this index on the server as well.
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
        <SidebarButton onClick={handleNewPiece} text="New Piece" icon={newIcon}/>
        <SidebarButton onClick={handleLogout} text="Logout" icon={logout}/>
      </div>
    </div>
  );
};

export default SidebarContent;
