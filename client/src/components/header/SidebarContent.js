import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';

import SidebarPiece from './SidebarPiece';

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
          totalDays={piece.plan.length + 1}
          onClick={() => {
            console.log('clicky');
            ctx.dispatch({type: 'updateCurrentPiece', payload: i})
          }}
        />
      ))}
    </div>
  );
};

export default SidebarContent;
