import React from 'react';
import { css } from '@emotion/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMusic as music,
  faTrash as trash,
  faEdit as edit,
} from '@fortawesome/free-solid-svg-icons';

const SidebarPiece = ({
  name,
  progressDays,
  totalDays,
  onClick,
  onEdit,
  onTrash,
}) => {
  return (
    <div
      css={css`
        margin: 10px 0px;
        &:hover {
          background: lightGray;
        }
        padding-left: 5px;
        cursor: pointer;
        display: flex;
      `}
      // onClick={onClick}
      // onKeyDown={onClick}
      // role = "button"
      // tabIndex='0'
    >
      <FontAwesomeIcon
        size="1x"
        icon={music}
        css={css`
          margin-right: 10px;
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
          `}
        >
          {name}
        </div>
        <div
          css={css`
            font-size: 12px;
            margin-left: 10px;
            color: darkgray;
          `}
        >
          Day {progressDays}/{totalDays}
        </div>
      </div>
      <FontAwesomeIcon
        size="1x"
        icon={edit}
        css={css`
          margin-right: 10px;
        `}
        onClick={onEdit}
        onKeyDown={onEdit}
        role="button"
        tabIndex="0"
      />
      <FontAwesomeIcon
        size="1x"
        icon={trash}
        css={css`
          margin-right: 10px;
        `}
        onClick={onTrash}
        onKeyDown={onTrash}
        role="button"
        tabIndex="0"
      />
    </div>
  );
};

export default SidebarPiece;
