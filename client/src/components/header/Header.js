import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';
import { HEADER_HEIGHT } from '../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon } from '@fortawesome/free-solid-svg-icons';

import { background, primary, text } from '../../colors';

const PIC_MARGIN = 10;

const Header = ({ setIsSideBarOpen }) => {
  const ctx = useContext(Context);
  return (
    <div
      css={css`
        display: flex;
        background: ${background(ctx)};
        border-style: none none solid none;
        border-color: ${primary(ctx)};
        height: ${HEADER_HEIGHT}px;
        align-items: center;
        padding-left: 15px;
      `}
    >
      <FontAwesomeIcon
        css={css`
          cursor: pointer;
          &:hover {
            transform: scale(1.3);
          }
        `}
        onClick={() => setIsSideBarOpen(true)}
        color={text(ctx)}
        size="1x"
        icon={faBars}
      />
      <div
        css={css`
          font-size: 25px;
          font-weight: 800;
          margin-left: 15px;
          color: ${text(ctx)};
          transition: color 500ms;
        `}
      >
        Tempo Builder
      </div>
      <div
        css={css`
          margin-left: auto;
          display: flex;
          align-items: center;
        `}
      >
        <FontAwesomeIcon
          css={css`
            cursor: pointer;
            &:hover {
              transform: scale(1.3);
            }
            margin-right: 10px;
          `}
          onClick={() => ctx.dispatch({ type: 'toggleNightMode' })}
          color={text(ctx)}
          size="1x"
          icon={faMoon}
        />
        {ctx.state.isAuthenticated && (
          <img
            css={css`
              margin: ${PIC_MARGIN}px;

              border-radius: ${(HEADER_HEIGHT - PIC_MARGIN * 2) / 2}px;
            `}
            alt="profile"
            src={ctx.state.user.image}
            height={HEADER_HEIGHT - PIC_MARGIN * 2}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
