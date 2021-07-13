import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const TeamActionButtons = () => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  let meetingCode = '';
  const handleInputChange = () => {};
  const handleEnter = () => {};
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        style={{
          fontSize: '1.5rem',
          textTransform: 'none',
          borderRadius: '10px',
        }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className="button"
      >
        Create a team
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Please enter the team invite code here
          </DialogContentText>
          <TextField
            id="standard-basic"
            label="Meeting code"
            type="text"
            value={meetingCode}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEnter} color="primary">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        style={{
          fontSize: '1.5rem',
          textTransform: 'none',
          borderRadius: '10px',
        }}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className="button"
      >
        Join a team
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Please enter the team invite code here
          </DialogContentText>
          <TextField
            id="standard-basic"
            label="Meeting code"
            type="text"
            value={meetingCode}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEnter} color="primary">
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamActionButtons;
