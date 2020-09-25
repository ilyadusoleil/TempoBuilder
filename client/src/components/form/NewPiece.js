import React, { useContext, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

import 'regenerator-runtime/runtime';

import { css } from '@emotion/core';
import Context from '../../Context';
import GeneratePlan from './GeneratePlan';

import { SERVER } from '../../constants';

import { uploadImage } from '../../ApiClient';

const NewPiece = () => {
  const ctx = useContext(Context);
  const [numSections, setNumSections] = useState(3);
  const { register, handleSubmit, errors } = useForm();

  // const fileInput1 = useRef();
  // const fileInput2 = useRef();
  // const fileInput3 = useRef();
  // const fileInput4 = useRef();
  // const fileInput5 = useRef();

  const [imageArray, setImageArray] = useState(new Array(5));

  const onSubmit = async (data) => {
    console.log('submit');

    // const refs = [fileInput1, fileInput2, fileInput3, fileInput4, fileInput5];

    // let imageArray = new Array(5);
    // for (let i = 0; i < 5; i++) {
    //   if (refs[i].current.files[0]) {
    //     const res = await uploadImage(refs[i].current.files[0]);
    //     imageArray[i] = res.url;
    //   }
    // }

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

        {Array.from(Array(5).keys()).map((i) => (
          <div
            key={i}
            css={css`
              display: ${numSections >= i + 1 ? 'inline-block' : 'none'};
            `}
          >
            <div>Section {i + 1}</div>
            <input
              // ref={fileInput1}
              type="file"
              onChange={(e) => {
                if (e.target?.files[0]) {
                  console.log('changed', e.target.files[0]);
                  uploadImage(e.target.files[0]).then((res) => {
                    console.log('uploaded', res.url);
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
              <img src={imageArray[i]} width="30%" alt="Sheet Music!" />
            )}
          </div>
        ))}

        <button onClick={onCancel}>Cancel</button>
        <button
          onClick={() => {
            console.log(imageArray);
          }}
        >
          showImageState
        </button>
        <input type="submit" value="Create" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default NewPiece;

{
  /* <input
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
        /> */
}
