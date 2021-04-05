/* eslint-disable no-lone-blocks */
import React from "react";
import { Planet } from "react-kawaii";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MoodTracker.css";
import { Button as MoodButton } from "reactstrap";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import app from './firebaseconfig';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import FirebaseService from './firebaseservice';


const KawaiiContainer = styled.section`
  left: 50%;
  transform: translate(-50%);
  position: relative;
  margin-top: 200px;
  width: 150px;
`;

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
      else if (text === 'Nutrition') {
          history.push('/nutrition')
      }
      else if (text === 'Information') {
          history.push('/information')
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
          {['Home', 'Feed', 'Nutrition', 'Fitness'].map((text, index) => (
          <ListItem button key={text} onClick={ () => goToSelected(text)}>
              <ListItemText primary={text} />
          </ListItem>
          ))}
      </List>
      <Divider />
      <List>
          {['Information', 'Settings'].map((text, index) => (
          <ListItem button key={text}>
              <ListItemText primary={text} />
          </ListItem>
          ))}
      </List>
      </div>
  );


return (
  <div>
      <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>
              <IconButton edge="start" onClick={toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
              <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer(['right', 'top', 'bottom'], false)}>
                      {list('left')}
                  </Drawer>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                  Mood Tracker
              </Typography>
              <Button color="inherit" onClick={() => app.auth().signOut()}>Log Out</Button>
              </Toolbar>
          </AppBar>
      </div>
  </div>
);
}

let userAuth = app.auth().currentUser;

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: {
          Emotion: "",
          Time: ""
      },
      color: "#61DDBC",
      moodList: ["sad", "shocked", "happy", "blissful"],
      moodhistory: [],
      isClicked: false,
      isLoading: true
    };
  }

    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllMood(userAuth.uid).on("value", this.onDataChange);

			} else {
                console.log("User not logged in")
			}
            
		});
        if (this.state.isLoading === true && userAuth !== null) {
            this.setState({ isLoading: false })
        }
        console.log(userAuth.uid)
    }

    componentWillUnmount = () => {
        app.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllMood(userAuth.uid).off("value", this.onDataChange);

			} else {
                console.log("User not logged in")
			}
            
		});

        console.log(userAuth.uid)    
    }

    onDataChange = (items) => {
        console.log(items);
        let moods = [];
        items.forEach(item => {
            let data = item.val();
            moods.push({
                key: item.key,
                emotion: data.Emotion
            });
        });
    
        this.setState({
            moodhistory: moods,
            isLoading: false
        });
    }

  clickeds = () => {
    this.setState({ isClicked: true });
  };

  back = () => {
    this.setState({ isClicked: false });
  };

  render() {
    const { moodhistory, isLoading } = this.state
    const moodList = moodhistory.map(item => {
        return <tr key={item.key}>
            <td style={{whiteSpace: 'nowrap'}}>{item.emotion}</td>
        </tr>
    });

    const handleSubmit = async() => {
        if (this.state.Mood.Emotion === "") {
            return <p>Please select a mood</p>
        } else {
            this.setState({ mood: { Time: app.database().ServerValue.TIMESTAMP }})
            FirebaseService.addMood(this.state.Mood, userAuth.uid);
        }
        
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div
            className="moodTracker-block"
            style={{ border: "2px solid transparent" }}
        >
            <div>
                <div
                className={
                    this.state.isClicked ? "hideEmotion" : "showEmotion"
                }
                >
                <KawaiiContainer>
                    <Planet mood={this.state.mood} color={this.state.color} />
                </KawaiiContainer>
                <br />

                {this.state.moodList.map((item, index) => (
                    <div>
                    <button
                        key={index}
                        className="ButtonMoods"
                        onClick={() => {
                        if (this.state.moodList.includes(item))
                            this.setState({ mood: item });
                        }}
                    >
                        {item}
                    </button>
                    </div>
                ))}
                </div>

                <div>
                <div
                    className={this.state.isClicked ? "boxOpened" : "boxClosed"}
                >
                    <div>
                    <MoodButton
                        style={{ backgroundColor: "#05386b", float: "left" }}
                        onClick={this.back}
                    >
                        Back
                    </MoodButton>{" "}
                    <br />
                    <table>
                        <thead>
                            <th>
                                <tr width="20%">Moods</tr>
                            </th>
                        </thead>
                        <tbody>
                            {moodList}
                        </tbody>
                    </table>
                    </div>
                </div>

                <div style={{ marginTop: "50px" }}>
                    <div
                    className={this.state.isClicked ? "notShow" : "show"}
                    onClick={this.clickeds}
                    >
                    <form onSubmit={handleSubmit}>
                    <MoodButton
                        style={{
                        backgroundColor: "#05386b",
                        fontSize: "20px",
                        borderRadius: "14px",
                        marginRight: "60px"
                        }}
                        type="submit"
                    >
                        Submit Mood
                    </MoodButton>
                    </form>
                    <MoodButton
                        style={{
                        backgroundColor: "#05386b",
                        fontSize: "20px",
                        borderRadius: "14px",
                        marginRight: "60px"
                        }}
                    >
                        History
                    </MoodButton>
                    </div>
                </div>
                </div>
            </div>
        </div>

    );
  }
}

export default function Mood() {
    return (
        <div>
            <ButtonAppBar />
            <Welcome />
        </div>
    )
}
