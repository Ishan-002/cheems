import React from 'react';
import { Link } from 'react-router-dom';
import VideoCallImage from '../../assets/video-call.svg';
import ChatImage from '../../assets/chat.svg';
import UserProfileImage from '../../assets/user-profile.svg';
import MeetingImage from '../../assets/team-meeting.svg';
import './landing.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const LandingCarousel = () => {
  return (
    <Carousel
      className="carousel"
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      interval={4000}
      stopOnHover={false}
    >
      <img src={VideoCallImage} />
      <img src={ChatImage} />
      <img src={UserProfileImage} />
      <img src={MeetingImage} />
    </Carousel>
  );
};

const Landing = () => {
  return (
    <div className="landing">
      <div className="container valign-wrapper">
        <div className="row starter-text">
          <div id="app-name">
            <h1>Cheems</h1>
            <p>An MS Teams clone</p>
          </div>
          <br />
          <div id="buttons">
            <div className="col s5">
              <Link
                to="/register"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  fontFamily: 'Segoe UI',
                }}
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                className="btn btn-large btn-flat waves-effect white black-text"
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  fontFamily: 'Segoe UI',
                }}
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <LandingCarousel />
    </div>
  );
};

export default Landing;
