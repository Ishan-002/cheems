import './App.css';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Landing from './components/landing/landing';
import Home from './components/home/home';
import { loginUserWithToken } from './api/userApi';
import { Context } from './store/store';
import { getCookie, removeCookie } from './utils/handleCookies';
import { loadTheme } from '@fluentui/react';
import { ThemeOptions } from './themes';
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core';

const appTheme = createTheme(ThemeOptions);
const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      loginUserWithToken(token)
        .then((res) => {
          const user = {
            username: res.user.username,
            email: res.user.email,
            login: true,
          };
          dispatch({ type: 'SET_USER', payload: user });
        })
        .catch(() => {
          removeCookie('token');
          dispatch({ type: 'RESET_APP' });
        });
    } else {
      dispatch({ type: 'RESET_APP' });
    }
  }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            {state.login ? <Home /> : <Landing />}
          </Route>
          <Route exact path="/login">
            {state.login ? <Home /> : <Login />}
          </Route>
          <Route exact path="/register">
            {state.login ? <Home /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
