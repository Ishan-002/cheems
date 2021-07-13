import React from 'react';
import Typography from '@material-ui/core/Typography';
import { VideoCall } from '@material-ui/icons';

const TeamHeader = (props) => {
  return (
    <Typography variant="h6" noWrap>
      {props.teamName == '' ? (
        <span>Select Team </span>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <span>{props.teamName}</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
              marginLeft: '950px',
            }}
          >
            <VideoCall style={{ fontSize: 40 }} />
            <span>Start a meeting</span>
          </div>
        </div>
      )}
    </Typography>
  );
};

export default TeamHeader;
