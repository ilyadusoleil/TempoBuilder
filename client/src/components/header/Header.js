import React, { useState } from 'react';
import { css } from '@emotion/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({setIsSideBarOpen}) => {
  return (
<div
          css={css`
            display: flex;
            background: peru;
            height: 50px;
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
        </div>
  );
};

export default Header;
