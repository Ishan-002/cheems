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
import { ThemeOptions } from './themes';
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';

const appTheme = createTheme(ThemeOptions);
const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

function App() {
  const [user, dispatch] = useContext(Context);
  const classes = useStyles();
  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      loginUserWithToken(token)
        .then((res) => {
          const newUser = {
            username: res.user.username,
            email: res.user.email,
            login: true,
            teams: res.user.teams,
          };
          console.log(newUser);
          // console.log(typeof(newUser.username));
          // console.log(typeof(newUser.email));
          // console.log(typeof(newUser.username));
          // console.log(typeof(newUser.username));
          dispatch({ type: 'SET_USER', payload: newUser });
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
    <ThemeProvider theme={appTheme} className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/">
            {user.login ? <Home /> : <Landing />}
          </Route>
          <Route exact path="/login">
            {user.login ? <Home /> : <SignIn />}
          </Route>
          <Route exact path="/register">
            {user.login ? <Home /> : <SignUp />}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
