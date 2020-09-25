import React, { useEffect, useContext } from 'react';

import Context from '../Context';

import HomePage from './HomePage';
import LoginPage from './LoginPage';

const MainPage = () => {
  const ctx = useContext(Context);

  // const _handleNotAuthenticated = () => {
  //   ctx.dispatch({type: 'setIsAuthenticated', payload: false});
  // };

  useEffect(() => {
    fetch('http://localhost:3000/auth/login/success', {
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
        console.log(responseJson.user);
        ctx.dispatch({type: 'setIsAuthenticated', payload: true});
        ctx.dispatch({type: 'setIsLoggedIn', payload: true});
        // setIsAuthenticated(true);
        ctx.dispatch({type: 'setUser', payload: responseJson.user});
        console.log('currentpiece: ', responseJson.user.currentPiece)
        ctx.dispatch({type: 'updateCurrentPiece', payload: responseJson.user.currentPiece})
        // setUser(responseJson.user);
      })
      .catch((error) => {
        // setIsAuthenticated(false);
        ctx.dispatch({type: 'setIsAuthenticated', payload: false});
        ctx.dispatch({type: 'setIsLoggedIn', payload: false});
        ctx.dispatch({type: 'setAuthError', payload: 'Failed to authenticate user'});
        // setError('Failed to authenticate user')
      });
  }, []);

  return <div>{ctx.state.isLoggedIn ? <HomePage /> : <LoginPage />}</div>;
};

export default MainPage;
