import { useContext } from 'react';
import { store } from '../../store/store';
import { Link } from 'react';
const Home = () => {
  const user = useContext(store);

  const enterCode = () => {
    let meetingCode = window.prompt('Enter the meeting code');
  };
  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <br />
      <div className="col s6">
        <Link
          // to="/register"
          style={{
            width: '140px',
            borderRadius: '3px',
            letterSpacing: '1.5px',
          }}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Create a meeting
        </Link>
      </div>
      <div className="col s6">
        <div
          // to="/login"
          onClick={enterCode}
          style={{
            width: '140px',
            borderRadius: '3px',
            letterSpacing: '1.5px',
          }}
          className="btn btn-large btn-flat waves-effect white black-text"
        >
          Join a meeting
        </div>
      </div>
    </div>
  );
};

export default Home;
