import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Context } from '../../store/store';
import { axiosInstance } from '../../api/axiosInstance';
import TeamHeader from './teamHeader';
import Messages from '../chat/messages';
import MessageBox from '../chat/messageBox';
import { io } from 'socket.io-client';
import '../chat/chatComponent.css';
import VideoRoomComponent from '../videoRoomComponent';
import TeamHome from '../../assets/team-home.svg';
import TeamActionButtons from './teamActionButtons';
import { createTeam, joinTeam } from '../../api/userApi';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  bottomPush: {
    position: 'fixed',
    bottom: 0,
    textAlign: 'center',
    paddingBottom: 10,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
}));

// const socket = io().connect();
// const socket = socketIOClient().connect();
const socket = io('http://localhost:3001').connect();

function Teams(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, dispatch] = useContext(Context);
  const [team, setTeam] = useState(undefined);
  const [meetingId, setMeetingId] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [inVideoCall, setInVideoCall] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    socket.on('message', function (data) {
      console.log(data.message);
      setMessages((messages) => [...messages, data.message]);
      // go to the bottom of the chat
      // var element = document.getElementById('main-container');
      // element.scrollTop = element.scrollHeight;
    });
  }, []);

  const sendMessage = (message) => {
    const username = user.username;
    const teamId = team._id;
    const data = {
      username,
      teamId,
      message,
    };
    console.log(data);
    socket.emit('send', data);
  };

  const openTeam = (teamId, username) => {
    if (team) {
      socket.emit('unsubscribe', team._id);
      setMeetingId(undefined);
    }
    axiosInstance
      .get(`/teams/${username}/${teamId}`)
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          const res = response.data;
          setTeam(res.team);

          const rmessages = [];
          res.team.messages.forEach((element) => {
            let message = {
              author: element.author.username,
              text: element.text,
            };
            rmessages.push(message);
          });
          console.log(rmessages);
          setMessages(rmessages);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    socket.emit('subscribe', teamId);
  };

  const startMeeting = () => {
    setInVideoCall(true);
  };

  const leaveMeeting = () => {
    setInVideoCall(false);
  };

  const handleCreateTeam = () => {
    let teamName = prompt('Please enter the team name');
    if (teamName) {
      createTeam(teamName, user.username);
    }
  };
  const handleJoinTeam = () => {
    let inviteCode = prompt('Please enter the team invite code');
    if (inviteCode) {
      joinTeam(inviteCode, user.username);
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {user.teams.map((team, index) => (
          <ListItem
            button
            key={index}
            id={team._id}
            onClick={() => {
              openTeam(team._id, user.username);
            }}
          >
            <ListItemText primary={team.teamName} />
          </ListItem>
        ))}
        <div
          style={{
            display: 'flex',
            marginTop: '5rem',
            position: 'absolute',
          }}
        >
          <Button onClick={handleCreateTeam} color="primary">
            Create a team
          </Button>
          <Button onClick={handleJoinTeam} color="primary">
            Join a team
          </Button>
        </div>
        {/* <TeamActionButtons className={classes.bottomPush} /> */}
      </List>
    </div>
  );

  function myFunction() {
    /* Get the text field */
    var copyText = document.getElementById('myInput');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand('copy');

    /* Alert the copied text */
    alert('Copied the text: ' + copyText.value);
  }
  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (inVideoCall) {
    return (
      <VideoRoomComponent
        username={user.username}
        sessionName={team._id}
        leaveSession={leaveMeeting}
      />
    );
  }
  return (
    <div className={classes.root}>
      <Button>Logout</Button>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="team-top-bar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <TeamHeader
            teamName={team ? team.teamName : ''}
            startMeeting={startMeeting}
            teamId={team ? team._id : ''}
          />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {team === undefined ? (
        <main
          className={classes.content}
          style={{
            position: 'relative',
            marginTop: '5vh',
            marginLeft: '25%',
          }}
        >
          <div className={classes.toolbar} />
          <img src={TeamHome} />
          <Typography paragraph>
            Click on one of the teams to see their details.
          </Typography>
        </main>
      ) : (
        <div className="chat">
          <Messages messages={messages} />
          <MessageBox
            onSendMessage={(message) => {
              sendMessage(message);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Teams;
