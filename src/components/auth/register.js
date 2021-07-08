import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../api/userApi';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const id = e.target.id;
    if (id == 'email') {
      setEmail(e.target.value);
    } else if (id == 'username') {
      setUsername(e.target.value);
    } else if (id == 'password') {
      setPassword(e.target.value);
    } else if (id == 'password2') {
      setPassword2(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
      password2: password2,
    };
    console.log(newUser);
    RegisterUser(newUser);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4 style={{ color: 'white' }}>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={handleSubmit}>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={username}
                //error={errors.name}
                id="username"
                type="text"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={email}
                //error={errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={password}
                //error={errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={password2}
                //error={errors.password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
