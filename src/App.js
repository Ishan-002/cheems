import './App.css';
import React, { useContext } from 'react';
import logo from './logo.png';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { createBrowserHistory } from 'history';
import withAuth from './components/withAuth';
// import Home from './components/home';
import Landing from './components/landing/landing';
import Home from './components/home/home';
import { GetUser } from './utils/getUser';
import { store } from './store/store';

const history = createBrowserHistory();

function App() {
  GetUser();
  const user = useContext(store);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user.login ? <Home /> : <Landing />}
        </Route>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Route exact path="/login">
          {user.login ? <Home /> : <Login />}
        </Route>
        <Route exact path="/register">
          {user.login ? <Home /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
