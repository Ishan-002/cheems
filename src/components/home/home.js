import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Context } from '../../store/store';
import VideoRoomComponent, { VideoComponent } from '../videoRoomComponent';
import './home.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { removeCookie } from '../../utils/handleCookies';
import ResponsiveDrawer from '../team/team';

const Home = () => {
  const [inCall, setInCall] = useState(false);
  const [user, dispatch] = useContext(Context);
  const [sessionName, setSessionName] = useState(
    'Session-' + Math.floor(Math.random() * 100)
  );
  const [open, setOpen] = useState(false);
  const [meetingCode, setMeetingCode] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setMeetingCode(e.target.value);
  };

  const leaveSession = () => {
    setInCall(false);
  };

  const createMeeting = () => {
    setInCall(true);
  };
  const handleEnter = () => {
    if (meetingCode) {
      setOpen(false);
      setSessionName(meetingCode);
      setInCall(true);
    }
  };
  const handleLogout = () => {
    removeCookie('token');
    window.location.href = '/';
  };

  if (inCall) {
    return (
      <VideoRoomComponent
        username={user.username}
        sessionName={sessionName}
        leaveSession={leaveSession}
      />
    );
  } else if (user.teams.length !== 0) {
    return <ResponsiveDrawer />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar id="toolbar">
          <Typography variant="h4">Hi, {user.username}! </Typography>
          <Button color="inherit" id="logout-button" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className="meeting-buttons">
        <Button
          onClick={createMeeting}
          className="button"
          color="secondary"
          style={{
            fontSize: '1.5rem',
            textTransform: 'none',
            background: '#383d48',
            borderRadius: '10px',
          }}
        >
          Create a meeting
        </Button>

        <div>
          <Button
            style={{
              fontSize: '1.5rem',
              textTransform: 'none',
              borderRadius: '10px',
            }}
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
            className="button"
          >
            Join a meeting
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                Please enter the meeting code here
              </DialogContentText>
              <TextField
                id="standard-basic"
                label="Meeting code"
                type="text"
                value={meetingCode}
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleEnter} color="primary">
                Enter
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Home;
