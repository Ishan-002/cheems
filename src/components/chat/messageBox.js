import React, { useState, useRef, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Context } from '../../store/store';
import './chatComponent.css';

const MessageBox = (props) => {
  const [message, setMessage] = useState('');
  const messageRef = useRef('');
  const [user, dispatch] = useContext(Context);

  const sendMessageClick = () => {
    if (messageRef.current.value === '') {
      return false;
    }

    const messageObject = {
      author: user.username,
      text: messageRef.current.value,
    };

    props.onSendMessage(messageObject);
    setMessage('');
  };

  return (
    <form class="chat-form" autoComplete="off">
      <TextField
        id="filled"
        variant="filled"
        // label="Write your message here"
        margin="normal"
        // multiline
        // fullWidth
        // rows="4"
        placeholder="Write your message here"
        inputRef={messageRef}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            //prevents enter from being pressed
            event.preventDefault();
            sendMessageClick();
          }
        }}
        value={message}
      />
      <Button variant="contained" color="primary" onClick={sendMessageClick}>
        Send
      </Button>
    </form>
  );
};

export default MessageBox;
