import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMusic as music,
  faTrash as trash,
  faEdit as edit,
} from '@fortawesome/free-solid-svg-icons';

import { primary, text } from '../../colors';
import { sidebarButtonStyle } from './SidebarStyles';

const SidebarPiece = ({
  name,
  progressDays,
  totalDays,
  onClick,
  onEdit,
  onTrash,
}) => {
  const ctx = useContext(Context);

  return (
    <div
      css={css`
        ${sidebarButtonStyle(ctx)}
      `}
    >
      <FontAwesomeIcon
        size="1x"
        icon={music}
        color={text(ctx)}
        css={css`
          margin-right: 20px;
        `}
      />
      <div
        css={css`
          flex-grow: 1;
        `}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex="0"
      >
        <div
          css={css`
            font-size: 15px;
            margin-bottom: 3px;
            color: ${text(ctx)};
          `}
        >
          {name}
        </div>
        <div
          css={css`
            font-size: 12px;
            margin-left: 10px;
            color: ${primary(ctx)};
          `}
        >
          Day {progressDays}/{totalDays}
        </div>
      </div>
      <FontAwesomeIcon
        size="1x"
        icon={edit}
        css={css`
          padding: 0px 5px;
          margin-right: 10px;
          &:hover {
            transform: scale(1.3);
          }
        `}
        onClick={onEdit}
        onKeyDown={onEdit}
        role="button"
        tabIndex="0"
        color={text(ctx)}
      />
      <FontAwesomeIcon
        size="1x"
        icon={trash}
        css={css`
          padding: 0px 5px;
          margin-right: 10px;
          &:hover {
            transform: scale(1.3);
          }
        `}
        onClick={onTrash}
        onKeyDown={onTrash}
        role="button"
        tabIndex="0"
        color={text(ctx)}
      />
    </div>
  );
};

export default SidebarPiece;
