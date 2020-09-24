import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/core';
import Context from '../../Context';
import GeneratePlan from './GeneratePlan';

const NewPiece = () => {
  const ctx = useContext(Context);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const newPiece = {
      name: data.pieceName,
      tempoTarget: data.tempoTarget,
      currentDay: 0,
      currentSession: 0,
      sections: 4,
      images: [],
      plan: GeneratePlan(data.sectionsCount),
    };
    // Convert data into new piece and add to context
    console.log(newPiece);
    ctx.dispatch({ type: 'addNewPiece', payload: newPiece });
    ctx.dispatch({ type: 'setDisplayState', payload: 'home' });
    // onSubmit={handleSubmit(onSubmit)}
  };

  const onCancel = () => {
    ctx.dispatch({ type: 'setDisplayState', payload: 'home' });
  };

  useEffect(() => {
    console.log('rargh', errors);
  }, [errors]);

  return (
    <div
      css={css`
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h2>Create New Practice Plan</h2>
      <form
        css={css`
          display: flex;
          flex-direction: column;
          margin: 20px;
        `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Piece Name"
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
          defaultValue="120"
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
        <input
          type="number"
          placeholder="Number of Sections"
          name="sectionsCount"
          defaultValue="4"
          ref={register({
            required: 'Required',
            max: {
              value: 5,
              message: 'Choose fewer sections', // <p>error message</p>
            },
            min: {
              value: 3,
              message: 'Choose more sections', // <p>error message</p>
            },
            maxLength: 20,
          })}
        />
        {errors.sectionsCount && errors.sectionsCount.message}

        <button onClick={onCancel}>Cancel</button>
        <input type="submit" value="Create" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default NewPiece;
