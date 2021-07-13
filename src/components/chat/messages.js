import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
  item: {
    // color: theme.palette.secondary.main,
    '& span, & svg': {
      fontSize: '1.5rem',
      color: '#98c379',
    },
  },
});

const Messages = ({ messages }) => {
  const classes = useStyles();
  console.log(messages);
  let i = 0;
  return (
    <List>
      <ListItem>
        <ListItemText>Hey, how are you!</ListItemText>
      </ListItem>
      {messages.map((messageObject) => [
        <ListItem alignItems="flex-start" key={++i}>
          <ListItemText
            style={{ backgroundColor: '#ABB2', borderRadius: '20px', padding: '1rem'}}
            // className={classes.item}
            primary={
              <Fragment>
                <Typography
                  component="span"
                  variant="body1"
                  className={classes.item}
                >
                  {messageObject.author}
                </Typography>
              </Fragment>
            }
            secondary={
              <Fragment>
                <Typography
                  // component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {messageObject.text}
                </Typography>
              </Fragment>
            }
          />
        </ListItem>,
        <Divider variant="inset" component="li" key={'divider-' + i} />,
      ])}
    </List>
  );
};

export default Messages;
