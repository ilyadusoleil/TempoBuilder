import React, {useContext} from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';
import { text as textColor} from '../../colors';

import { sidebarButtonStyle } from './SidebarStyles';
const SidebarButton = ({ onClick, text }) => {
  const ctx = useContext(Context);

  return (
    <div
      css={css`
        ${sidebarButtonStyle(ctx)}

        text-align: center;
        vertical-align: middle;
        height: 30px;
        color: ${textColor(ctx)}
      `}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      {text}
    </div>
  );
};

export default SidebarButton;
