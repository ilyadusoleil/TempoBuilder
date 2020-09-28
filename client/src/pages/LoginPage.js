import React from 'react';
import { css } from '@emotion/core';

import background from '../assets/music-sheet-1326999_1920.jpg';
import GoogleButton from 'react-google-button';
import { HEADER_HEIGHT } from '../constants.js';
import Logo from '../components/Logo';

const LoginPage = () => {
  const LoginGoogle = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };

  return (
    <div>
      <div
        css={css`
          height: ${HEADER_HEIGHT}px;
          display: flex;
          align-items: center;
        `}
      >
        <Logo/>
      </div>
      <div
        css={css`
          height: calc(100vh - ${HEADER_HEIGHT}px);
          display: flex;
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
          <div
            css={css`
              margin-bottom: 30px;
              font-size: 20px;
            `}
          >
            I need a catchphrase
          </div>
          <GoogleButton type="dark" onClick={LoginGoogle} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
