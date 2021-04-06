import React from "react";
import "./AppointmentCSS.css";
import app from '../firebaseconfig';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { useHistory } from 'react-router-dom'
import FirebaseService from '../firebaseservice'

let userAuth = app.auth().currentUser;
export default class BookAppointment extends React.Component {
  emptyApp = {
    Date: '',
    FirstName: '',
    LastName: '',
    Reason: ''
  };
  constructor() {
    super();
    this.state = {
      appointment: this.emptyApp,
      info: {
        FirstName: '',
        LastName: ''
      }
    };
  }

  componentDidMount = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in")
        userAuth = user
        console.log(userAuth)
        FirebaseService.getInfo(userAuth.uid).on("value", this.onDataChange);
      } else {
        console.log("User not logged in")
      }
    });
    if (userAuth !== null) {
      console.log(userAuth.uid)
    }
  }

  componentWillUnmount = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is logged in")
        userAuth = user
        console.log(userAuth)
        FirebaseService.getInfo(userAuth.uid).off("value", this.onDataChange);
      } else {
        console.log("User not logged in")
      }
    });
    if (userAuth !== null) {
      console.log(userAuth.uid)
    }
  }

  onDataChange = (item) => {
    console.log(item);
    let data = item.val();
    this.setState({
      info: {
        FirstName: data.FirstName,
        LastName: data.LastName
      }
    });
    console.log(this.state.appointment)
  }

  checkData = () => {
    if (this.state.datePicked !== "") {
      return "show";
    }
    return "hide";
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { start, reason } = e.target.elements;
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.appointment = {
      Date: start.value,
      FirstName: this.state.info.FirstName,
      LastName: this.state.info.LastName,
      Reason: reason.value
    };
    console.log(this.state.appointment)
    FirebaseService.addApp(this.state.appointment, start.value, userAuth.uid);

  }

  render() {
    return (
      <div>
        <ButtonAppBar />
        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <label for="start">Date:</label>
            <input
              type="date"
              name="start"
              id="start"
              min="2018-01-01"
              onChange={e => e.target.value}
            />{" "}
            <br />
            <br />
            <div className={this.checkData()}>
              <textarea name="reason" id="reason" placeholder="Type something" onChange={e => e.target.value} /> <br />
              <button type="submit">Make appointment </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const goToSelected = (text) => {
    if (text === 'Home') {
      history.push('/')
    }
    else if (text === 'Book Appointment') {
      history.push('/bookappointment')
    }
    else if (text === 'Fitness') {
      history.push('/fitness')
    }
    else if (text === 'Mood') {
      history.push('/mood')
    }
    else if (text === 'Information') {
      history.push('/information')
    }
    else if (text === 'Nutrition') {
      history.push('/nutrition')
    }
    else if (text === 'Summary') {
      history.push('/summary')
    }
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'Feed', 'Mood', 'Nutrition', 'Fitness', 'Book Appointment', 'Summary'].map((text, index) => (
          <ListItem button key={text} onClick={() => goToSelected(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Information', 'Settings'].map((text, index) => (
          <ListItem button key={text} onClick={() => goToSelected(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
              {list('left')}
            </Drawer>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Book Appointment
                </Typography>
          <Button color="inherit" onClick={() => app.auth().signOut()}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}