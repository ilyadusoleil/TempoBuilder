import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';
import { HEADER_HEIGHT } from '../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faMoon } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo';

import { header, primary, text } from '../../colors';

const PIC_MARGIN = 10;

const Header = ({ setIsSideBarOpen }) => {
  const ctx = useContext(Context);
  return (
    <div
      css={css`
        display: flex;
        background: ${header(ctx)};
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
        onClick={() =>
          ctx.state.displayState === 'home'
            ? setIsSideBarOpen(true)
            : ctx.dispatch({ type: 'setDisplayState', payload: 'home' })
        }
        color={text(ctx)}
        size="1x"
        icon={ctx.state.displayState === 'home' ? faBars : faHome}
      />
      <div
        css={css`
          color: ${text(ctx)};
          transition: color 500ms;
        `}
      >
        <Logo />
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
