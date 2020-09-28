/* eslint-disable jsx-a11y/no-onchange */
//TODO remove above eslint
import React from 'react';

import { css } from '@emotion/core';
import ImageUploader from './ImageUploader';

const PieceForm = ({
  register,
  errors,
  numSections,
  setNumSections,
  imageArray,
  setImageArray,
  pieceInfo,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        color: blue;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        `}
      >
        <div className="inputLabel">Name:</div>
        <input
          type="text"
          placeholder="Piece Name"
          defaultValue={pieceInfo?.name || ''}
          name="pieceName" //Didn't call name so autocomplete is different hmm
          ref={register({
            required: 'Required',
            maxLength: {
              value: 80,
              message: 'Too long',
            },
          })}
        />
        {errors.pieceName && errors.pieceName.message}
        <div className="inputLabel">Target Tempo (bpm):</div>
        <input
          type="number"
          placeholder="Target Tempo"
          name="tempoTarget"
          defaultValue={pieceInfo?.tempoTarget || '120'}
          ref={register({
            required: 'Required',
            max: {
              value: 300,
              message: 'Choose a lower tempo',
            },
            min: {
              value: 30,
              message: 'Choose a higher tempo',
            },
          })}
        />
        {errors.tempoTarget && errors.tempoTarget.message}
        <div
          css={css`
            display: flex;
          `}
          className="inputLabel"
        >
          <div
            css={css`
              margin-right: 5px;
            `}
          >
            Number of Sections:
          </div>
          <select
            name="sectionsCount"
            ref={register({ required: true })}
            defaultValue={numSections}
            onChange={(e) => {
              setNumSections(parseInt(e.target.value));
            }}
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        {errors.sectionsCount && errors.sectionsCount.message}
      </div>

      <ImageUploader
        setImageArray={setImageArray}
        numSections={numSections}
        imageArray={imageArray}
      />
    </div>
  );
};

export default PieceForm;
