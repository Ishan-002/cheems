import { AppBar } from '@material-ui/core';
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
import DialogTitle from '@material-ui/core/DialogTitle';

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

  if (inCall) {
    return (
      <VideoRoomComponent
        username={user.username}
        sessionName={sessionName}
        leaveSession={leaveSession}
      />
    );
  }

  return (
    <div>
      <div className="meeting-buttons">
        <Button onClick={createMeeting}>Create a meeting</Button>
        OR
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
