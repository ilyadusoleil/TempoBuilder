import React, { useContext, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import 'regenerator-runtime/runtime';

import { css } from '@emotion/core';
import Context from '../../Context';
import GeneratePlan from './GeneratePlan';

import { SERVER } from '../../constants';

import ImageUploader from './ImageUploader'


const NewPiece = () => {
  const ctx = useContext(Context);
  const [numSections, setNumSections] = useState(3);
  const { register, handleSubmit, errors } = useForm();

  const [imageArray, setImageArray] = useState(new Array(5));

  const onSubmit = async (data) => {
    console.log('submit');

    const newPiece = {
      name: data.pieceName,
      tempoTarget: data.tempoTarget,
      currentDay: 0,
      currentSession: 0,
      sectionsCount: data.sectionsCount,
      images: imageArray,
      plan: GeneratePlan(data.sectionsCount),
    };

    // Convert data into new piece and add to context
    console.log('newPiece sending', newPiece);

    fetch(`${SERVER}/piece`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(newPiece),
    }).then((res) => console.log('returned', res, res.body));

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
      <h2>Create New Practice Plan</h2>
      <form
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
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
        <select
          name="sectionsCount"
          ref={register({ required: true })}
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

        <ImageUploader setImageArray={setImageArray} numSections={numSections} imageArray={imageArray}/>

        <button onClick={onCancel}>Cancel</button>
        <input type="submit" value="Create" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default NewPiece;
