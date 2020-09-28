import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import 'regenerator-runtime/runtime';

import { css } from '@emotion/core';
import Context from '../../Context';
import GeneratePlan from './GeneratePlan';

import {newPiece as uploadNewPiece} from '../../ApiClient';

import { text } from '../../colors';
import PieceForm from './PieceForm';

const NewPiece = () => {
  const ctx = useContext(Context);
  const [numSections, setNumSections] = useState(3);
  const { register, handleSubmit, errors } = useForm();

  const [imageArray, setImageArray] = useState(new Array(5));

  const onSubmit = async (data) => {
    const newPiece = {
      name: data.pieceName,
      tempoTarget: data.tempoTarget,
      currentDay: 0,
      currentSession: 0,
      sectionsCount: data.sectionsCount,
      images: imageArray,
      plan: GeneratePlan(data.sectionsCount),
    };

    // Upload new piece and add to local context
    uploadNewPiece(newPiece)
    ctx.dispatch({ type: 'addNewPiece', payload: newPiece });
    ctx.dispatch({ type: 'setDisplayState', payload: 'home' });
  };

  const onCancel = () => {
    ctx.dispatch({ type: 'setDisplayState', payload: 'home' });
  };

  return (
    <div
      css={css`
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h2
        css={css`
          color: ${text(ctx)};
        `}
      >
        Create New Practice Plan
      </h2>
      <form
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px;
        `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <PieceForm
          register={register}
          errors={errors}
          numSections={numSections}
          setNumSections={setNumSections}
          imageArray={imageArray}
          setImageArray={setImageArray}
        />

        <button onClick={onCancel}>Cancel</button>
        <input type="submit" value="Create" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default NewPiece;
