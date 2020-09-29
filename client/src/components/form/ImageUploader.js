import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../../Context';

import { uploadImage } from '../../ApiClient';

import { FORM_BUTTON } from './formStyles';
import { MEDIA_QUERY_WIDTH } from '../../constants';
import { primary, secondary } from '../../colors';

const ImageUploader = ({ setImageArray, numSections, imageArray }) => {
  const ctx = useContext(Context);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        ${MEDIA_QUERY_WIDTH} {
          flex-direction: row;
          align-items: center;
        }
      `}
    >
      {Array.from(Array(5).keys()).map((i) => (
        <div
          key={i}
          css={css`
            display: ${numSections >= i + 1 ? 'flex' : 'none'};
            flex-direction: column;
            ${MEDIA_QUERY_WIDTH} {
              width: 15vw;
            }
            align-items: center;
            margin: 15px;
          `}
        >
          <div>Section {i + 1}</div>
          <label
            css={css`
              ${FORM_BUTTON(ctx)}
            `}
          >
            Upload Image
            <input
              css={css`
                width: 100%;
                margin-bottom: 10px;
                display: none;
              `}
              type="file"
              onChange={(e) => {
                if (e.target?.files[0]) {
                  uploadImage(e.target.files[0]).then((res) => {
                    setImageArray((oldArray) => {
                      let output = [...oldArray];
                      output[i] = res.url;
                      return output;
                    });
                  });
                }
              }}
            />
          </label>
          {imageArray[i] && (
            <img src={imageArray[i]} width={'100%'} alt="Sheet Music!" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
