import { useContext, useState } from 'react';
import { Context } from '../../store/store';
import VideoRoomComponent, { VideoComponent } from '../videoRoomComponent';

const Home = () => {
  const [inCall, setInCall] = useState(false);
  const [user, dispatch] = useContext(Context);
  const [sessionName, setSessionName] = useState(
    'Session-' + Math.floor(Math.random() * 100)
  );
  const enterCode = () => {
    let meetingCode = window.prompt('Enter the meeting code');
    console.log(meetingCode);
    setSessionName(meetingCode);
    setInCall(true);
  };

  const leaveSession = () => {
    setInCall(false);
  };

  const createMeeting = () => {
    setInCall(true);
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
      <h1>Hello {user.username}</h1>
      <br />
      <div
        className="btn btn-large btn-flat waves-effect white black-text"
        onClick={createMeeting}
        style={{
          // width: '140px',
          borderRadius: '3px',
          letterSpacing: '1.5px',
        }}
      >
        Create a meeting
      </div>
      <div
        className="btn btn-large btn-flat waves-effect white black-text"
        onClick={enterCode}
        style={{
          // width: '140px',
          borderRadius: '3px',
          letterSpacing: '1.5px',
        }}
      >
        Join a meeting
      </div>
    </div>
  );
};

export default Home;
