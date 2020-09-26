import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/core';

import Context from '../../Context';

import PieceForm from './PieceForm';
import { updatePiece } from '../../ApiClient';

const EditPiece = () => {
  const ctx = useContext(Context);
  const editPiece = ctx.state.pieces[ctx.state.editIdx];

  const { register, handleSubmit, errors } = useForm();
  const [numSections, setNumSections] = useState(editPiece.sectionsCount);

  const [imageArray, setImageArray] = useState([...editPiece.images]);

  const onSubmit = (data) => {
    const newPiece = {
      ...editPiece,
      name: data.pieceName,
      tempoTarget: data.tempoTarget,
      sectionsCount: data.sectionsCount,
      images: imageArray,
    };

    // Convert data into new piece and add to context
    console.log('submit', newPiece);

    ctx.dispatch({ type: 'updatePiece', payload: newPiece})
    ctx.dispatch({ type: 'setDisplayState', payload: 'home' });
    updatePiece(newPiece);
  };

  const onCancel = () => {
    ctx.dispatch({ type: 'setDisplayState', payload: 'home' });
  };

  return (
    <div>
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
          pieceInfo={editPiece}
        />

        <button onClick={onCancel}>Cancel</button>
        <input type="submit" value="Create" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default EditPiece;
