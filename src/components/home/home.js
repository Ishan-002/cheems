import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Context } from '../../store/store';
import VideoRoomComponent from '../videoRoomComponent';
import './home.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { removeCookie } from '../../utils/handleCookies';
import Teams from '../team/team';
import RocketImage from '../../assets/rocket.svg';
import { createTeam, joinTeam } from '../../api/userApi';

const Home = () => {
  const [user, dispatch] = useContext(Context);

  const createTeamHandler = () => {
    let teamName = prompt('Please enter the team name');
    if (teamName) {
      createTeam(teamName, user.username);
    }
  };
  const joinTeamHandler = () => {
    let inviteCode = prompt('Please enter the team invite code');
    if (inviteCode) {
      joinTeam(inviteCode, user.username);
    }
  };

  if (user.teams.length != 0) {
    return <Teams />;
  }
  return (
    <div className="homepage">
      <div style={{ left: '50%' }}>
        <Button
          color="primary"
          style={{ fontSize: '2rem', textTransform: 'none' }}
          onClick={createTeamHandler}
        >
          Create a team
        </Button>
        <img
          src={RocketImage}
          style={{
            height: '25rem',
          }}
        />
        <Button
          color="secondary"
          style={{ fontSize: '2rem', textTransform: 'none' }}
          onClick={joinTeamHandler}
        >
          Join a team
        </Button>
      </div>
    </div>
  );
};

export default Home;
