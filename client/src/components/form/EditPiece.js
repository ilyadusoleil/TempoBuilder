import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/core';

import Context from '../../Context';

import PieceForm from './PieceForm';
import { updatePiece } from '../../ApiClient';
import { FORM_BUTTON } from './formStyles';
import { text } from '../../colors';

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

    ctx.dispatch({ type: 'updatePiece', payload: newPiece });
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
          color: ${text(ctx)};
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
        <div
          css={css`
            color: ${text(ctx)};
          `}
        >
          Plan Details
        </div>
        {editPiece.plan.map((day, i) => (
          <div key={i}>
            <div>Day {i + 1}</div>
            {day.map((session, i) => (
              <div key={i}>
                Session {i + 1}: {session.section === -1 ? 'Full run' : `Section ${session.section + 1}`}, x
                {session.repetitions} at {session.percent}%
              </div>
            ))}
          </div>
        ))}
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 5px;
          `}
        >
          <button
            css={css`
            ${FORM_BUTTON(ctx)};
            margin: 0px;
            margin-right: 20px;
            height: 30px;
            border: none;
          `}
            onClick={onCancel}
          >
            Cancel
          </button>
          <input
            css={css`
              ${FORM_BUTTON(ctx)};
              margin: 0px;
              height: 30px;
              border: none;
            `}
            type="submit"
            value="Update"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPiece;
