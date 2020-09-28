import React from 'react';
import { css } from '@emotion/core';

import { uploadImage } from '../../ApiClient';

import { MEDIA_QUERY_WIDTH } from '../../constants';

const ImageUploader = ({ setImageArray, numSections, imageArray }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        ${MEDIA_QUERY_WIDTH} {
          flex-direction: row;
        }
      `}
    >
      {Array.from(Array(5).keys()).map((i) => (
        <div
          key={i}
          css={css`
            display: ${numSections >= i + 1 ? 'flex' : 'none'};
            flex-direction: column;
            width: 15vw;
            align-items: center;
            margin: 15px;
          `}
        >
          <div>Section {i + 1}</div>
          <input
            css={css`
              width: 100%;
              margin-bottom: 10px;
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
          {imageArray[i] && (
            <img src={imageArray[i]} width={'100%'} alt="Sheet Music!" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
