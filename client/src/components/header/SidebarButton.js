import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';
import { text as textColor } from '../../colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { sidebarButtonStyle } from './SidebarStyles';
const SidebarButton = ({ onClick, text, icon }) => {
  const ctx = useContext(Context);

  return (
    <div
      css={css`
        ${sidebarButtonStyle(ctx)}
        text-align: center;
        vertical-align: middle;
        height: 30px;
        color: ${textColor(ctx)};
      `}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      {icon && (
        <FontAwesomeIcon
          size="1x"
          icon={icon}
          color={textColor(ctx)}
          css={css`
            margin-right: 20px;
          `}
        />
      )}
      <div
        css={css`
          align-self: center;
        `}
      >
        {text}
      </div>
    </div>
  );
};

export default SidebarButton;
