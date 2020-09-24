import React, { useContext } from 'react';
import { css } from '@emotion/core';

import Context from '../Context';

const LoginPage = () => {
  const ctx = useContext(Context);

  // const LoginGoogle = () => {
  //   console.log('login google hmm');
  // };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <h1>Login</h1>
      <a href="http://localhost:3000/auth/google">Login with goooogle</a>
      <button>Continue as Guest</button>
    </div>
  );
};

export default LoginPage;
