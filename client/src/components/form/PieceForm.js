/* eslint-disable jsx-a11y/no-onchange */

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
  pieceInfo
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <input
        type="text"
        placeholder="Piece Name"
        defaultValue={pieceInfo?.name || ""}
        name="pieceName" //Didn't call name so autocomplete is different hmm
        ref={register({
          required: 'Required',
          maxLength: {
            value: 80,
            message: 'Too long', // <p>error message</p>
          },
        })}
      />
      {errors.pieceName && errors.pieceName.message}
      <input
        type="number"
        placeholder="Target Tempo"
        name="tempoTarget"
        defaultValue={pieceInfo?.tempoTarget || "120"}
        ref={register({
          required: 'Required',
          max: {
            value: 300,
            message: 'Choose a lower tempo', // <p>error message</p>
          },
          min: {
            value: 30,
            message: 'Choose a higher tempo', // <p>error message</p>
          },
        })}
      />
      {errors.tempoTarget && errors.tempoTarget.message}
      <select
        name="sectionsCount"
        ref={register({ required: true })}
        defaultValue={numSections}
        onChange={(e) => {
          setNumSections(parseInt(e.target.value));
          console.log('number of sections', e.target.value, numSections);
        }}
      >
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      {errors.sectionsCount && errors.sectionsCount.message}
      <ImageUploader
        setImageArray={setImageArray}
        numSections={numSections}
        imageArray={imageArray}
      />
    </div>
  );
};

export default PieceForm;
