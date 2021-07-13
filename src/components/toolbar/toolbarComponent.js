import React, { useState } from 'react';
import './toolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MicIcon from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';

const ToolbarComponent = (props) => {
  const [fullscreen, setFullscreen] = useState(false);

  const micStatusChanged = () => {
    props.micStatusChanged();
  };

  const camStatusChanged = () => {
    props.camStatusChanged();
  };

  const startScreenShare = () => {
    props.screenShare();
  };

  const stopScreenShare = () => {
    props.stopScreenShare();
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    props.toggleFullscreen();
  };

  const leaveSession = () => {
    props.leaveSession();
  };

  const toggleChat = () => {
    props.toggleChat();
  };

  const localUser = props.user;
  return (
    <AppBar className="toolbar" id="header">
      <Toolbar className="toolbar">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(props.sessionId);
            alert('Invite code copied to clipboard');
          }}
        >
          Invite
        </Button>
        {/* <div id="navSessionInfo">{props.sessionId}</div> */}
        <div className="buttonsContent">
          <IconButton
            color="inherit"
            className="navButton"
            id="navMicButton"
            onClick={micStatusChanged}
            disabled={!props.isLoaded}
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <MicIcon />
            ) : (
              <MicOff color="secondary" />
            )}
          </IconButton>

          <IconButton
            color="inherit"
            className="navButton"
            id="navCamButton"
            onClick={camStatusChanged}
            disabled={!props.isLoaded}
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <Videocam />
            ) : (
              <VideocamOff color="secondary" />
            )}
          </IconButton>

          <IconButton
            color="inherit"
            className="navButton"
            onClick={startScreenShare}
            disabled={!props.isLoaded}
          >
            {localUser !== undefined && localUser.isScreenShareActive() ? (
              <PictureInPicture />
            ) : (
              <ScreenShare />
            )}
          </IconButton>

          {localUser !== undefined && localUser.isScreenShareActive() && (
            <IconButton
              onClick={stopScreenShare}
              id="navScreenButton"
              disabled={!props.isLoaded}
            >
              <StopScreenShare color="secondary" />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            className="navButton"
            onClick={toggleFullscreen}
            disabled={!props.isLoaded}
          >
            {localUser !== undefined && fullscreen ? (
              <FullscreenExit />
            ) : (
              <Fullscreen />
            )}
          </IconButton>
          <IconButton
            color="secondary"
            className="navButton"
            onClick={leaveSession}
            id="navLeaveButton"
            disabled={!props.isLoaded}
          >
            <CallEndIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={toggleChat}
            id="navChatButton"
            disabled={!props.isLoaded}
          >
            {props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <ChatBubbleIcon />
            </Tooltip>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ToolbarComponent;
