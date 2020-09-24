import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';
import { HEADER_HEIGHT } from '../../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const PIC_MARGIN = 10;

const Header = ({ setIsSideBarOpen }) => {
  const ctx = useContext(Context);
  return (
    <div
      css={css`
        display: flex;
        background: peru;
        height: ${HEADER_HEIGHT}px;
        align-items: center;
        margin-bottom: 20px;
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
        color="#black"
        size="1x"
        icon={faBars}
      />
      <div
        css={css`
          font-size: 25px;
          font-weight: 800;
          margin-left: 15px;
        `}
      >
        Tempo Builder
      </div>
      {ctx.state.isAuthenticated && (
        <img
          css={css`
            margin: ${PIC_MARGIN}px;
            margin-left: auto;
            border-radius: ${(HEADER_HEIGHT - PIC_MARGIN * 2) / 2}px;
          `}
          alt="profile"
          src={ctx.state.user.image}
          height={HEADER_HEIGHT - PIC_MARGIN * 2}
        />
      )}
    </div>
  );
};

export default Header;
