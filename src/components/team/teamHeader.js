import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';

const TeamHeader = (props) => {
  const clickInvite = () => {
    navigator.clipboard.writeText(props.teamId);
    alert(`Invite code copied to clipboard`);
  };

  return (
    <Typography variant="h6" noWrap style={{ padding: 0 }}>
      {props.teamName == '' ? (
        <span>Select your team</span>
      ) : (
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          <Typography style={{ flex: 1, fontSize: '1.5rem' }}>
            {props.teamName}
          </Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginLeft: '50vw',
            }}
          >
            <Button color="secondary" variant="outlined" onClick={clickInvite}>
              Invite
            </Button>
            <Button
              color="secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}
              onClick={props.startMeeting}
            >
              <VideocamIcon style={{ fontSize: 40 }} />

              <span>Join a meeting</span>
            </Button>
          </div>
        </div>
      )}
    </Typography>
  );
};

export default TeamHeader;
