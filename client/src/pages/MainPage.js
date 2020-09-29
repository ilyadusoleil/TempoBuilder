import React, { useEffect, useContext } from 'react';

import Context from '../Context';

import HomePage from './HomePage';
import LoginPage from './LoginPage';

import { SERVER } from '../constants.js'

const MainPage = () => {
  const ctx = useContext(Context);

  useEffect(() => {
    fetch(`/auth/login/success`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      })
      .then((responseJson) => {
        ctx.dispatch({ type: 'setIsAuthenticated', payload: true });
        ctx.dispatch({ type: 'setIsLoggedIn', payload: true });
        ctx.dispatch({ type: 'setUser', payload: responseJson.user });
        ctx.dispatch({
          type: 'updateCurrentPiece',
          payload: responseJson.user.currentPiece,
        });
      })
      .catch((error) => {
        ctx.dispatch({ type: 'setIsAuthenticated', payload: false });
        ctx.dispatch({ type: 'setIsLoggedIn', payload: false });
        ctx.dispatch({
          type: 'setAuthError',
          payload: 'Failed to authenticate user',
        });
        // eslint-disable-next-line no-console
        console.error("Failed to authenticate user", error)
      });
  }, []);

  return <div>{ctx.state.isLoggedIn ? <HomePage /> : <LoginPage />}</div>;
};

export default MainPage;
