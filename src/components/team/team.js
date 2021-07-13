import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
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
const socket = io().connect();

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, dispatch] = useContext(Context);
  const [team, setTeam] = useState(undefined);

  const [messages, setMessages] = useState([]);

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
    }
    axiosInstance
      .get(`/teams/${username}/${teamId}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const res = response.data;
          setTeam(res.team);
          const rmessages = res.team.messages;
          console.log(rmessages);
          setMessages(rmessages);
          // messages.forEach((elem) =>
          //   dbMessages.push({ author: elem.author, text: elem.text })
          // );
          // setMessages(...dbMessages);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    socket.emit('subscribe', teamId);
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
            onClick={() => {
              openTeam(team._id, user.username);
            }}
          >
            <ListItemText primary={team.teamName} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
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
          <TeamHeader teamName={team ? team.teamName : ''} />
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
        <main className={classes.content}>
          <div className={classes.toolbar} />
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

export default ResponsiveDrawer;
