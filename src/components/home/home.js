import { useContext } from 'react';
import { Context } from '../../store/store';

const Home = () => {
  const enterCode = () => {
    let meetingCode = window.prompt('Enter the meeting code');
    console.log(meetingCode);
  };

  const createMeeting = () => {};
  const [user, dispatch] = useContext(Context);
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
