import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Router } from '@reach/router';
import { css } from '@emotion/core';

import HomePage from './pages/HomePage';

const App = () => {
  return (
    <React.StrictMode>
      <HomePage />
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

{
  /* <Router>
<HomePage path="/"/>
</Router> */
}
