import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../Context';

import background from '../assets/music-sheet-1326999_1920.jpg';
import GoogleButton from 'react-google-button';

const LoginPage = () => {
  const ctx = useContext(Context);

  const LoginGoogle = () => {
    window.open('http://localhost:3000/auth/google', '_self');
    console.log('login google hmm');
  };

  return (
    <div>
      <div
        css={css`
          height: 7vh;
          display: flex;
          align-items: center;
          margin-left: 20px;
          font-family: "Bowlby";
          /* background: lightgray; */
        `}
      >
        Tempo Builder
      </div>
      <div
        css={css`
          height: 93vh;
          display: flex;
          /* flex-direction: column; */
          justify-content: center;
          align-items: center;
          background: url(${background}) no-repeat center center fixed;
          background-size: cover;
        `}
      >
        <div
          css={css`
            background: white;
            height: 150px;
            width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
          `}
        >
          <div css={css`
            margin-bottom: 30px;
            font-size: 20px;

          `}>I need a catchphrase</div>
          {/* <a href="http://localhost:3000/auth/google">Login with goooogle</a> */}
          <GoogleButton type="dark" onClick={LoginGoogle} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
