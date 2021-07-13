import React, { useState } from 'react';
import './streamComponent.css';
import UserVideoComponent from './userVideoComponent';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';
import IconButton from '@material-ui/core/IconButton';

const StreamComponent = (props) => {
  const [isMuted, setisMuted] = useState(false);

  const toggleSound = () => {
    setisMuted({ isMuted: !isMuted });
  };

  return (
    <div className="OT_widget-container">
      <div className="nickname">
        <div>
          <span id="nickname">{props.user.getNickname()}</span>
        </div>
      </div>

      {props.user !== undefined &&
      props.user.getStreamManager() !== undefined ? (
        <div className="streamComponent">
          <UserVideoComponent user={props.user} isMuted={isMuted} />
          <div id="statusIcons">
            {!props.user.isVideoActive() ? (
              <div id="camIcon">
                <VideocamOff id="statusCam" />
              </div>
            ) : null}

            {!props.user.isAudioActive() ? (
              <div id="micIcon">
                <MicOff id="statusMic" />
              </div>
            ) : null}
          </div>
          <div>
            {!props.user.isLocal() && (
              <IconButton id="volumeButton" onClick={toggleSound}>
                {isMuted ? <VolumeOff color="secondary" /> : <VolumeUp />}
              </IconButton>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StreamComponent;
