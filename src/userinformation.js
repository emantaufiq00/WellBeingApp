import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import app from './firebaseconfig';
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
import { useHistory } from 'react-router-dom';
import FirebaseService from './firebaseservice';

let userAuth = app.auth().currentUser;
console.log(userAuth);
export default class UserInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Info: {
            FirstName: "",
            LastName: "",
            Email: "",
            EmpID: "",
            EmpDept: ""
        },
        isLoading: true
    }
    }

    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllInfo(userAuth.uid).on("value", this.onDataChange);

			} else {
                console.log("User not logged in")
			}
		});
        if (this.state.isLoading === true) {            
            this.setState({ isLoading: false })
        }
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
                FirebaseService.getAllInfo(userAuth.uid).on("value", this.onDataChange);

			} else {
                console.log("User not logged in")
			}
		});
        if (this.state.isLoading === true) {            
            this.setState({ isLoading: false })
        }
        if (userAuth !== null) {
            console.log(userAuth.uid)
        }    
    }

    onDataChange = (item) => {
        console.log(item);
        let data = item.val();
        let info = {
            FirstName: data.FirstName,
            LastName: data.LastName,
            Email: data.Email,
            EmpID: data.EmpID,
            EmpDept: data.EmpDept
        };
    
        this.setState({
            Info: info,
            isLoading: false
        });

        console.log(this.state.Info);
    }

    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        return (
            <div>
                <ButtonAppBar /><br />
                <h4>Your Information</h4>
                <p>First Name: {this.state.Info.FirstName}</p>
                <p>Last Name: {this.state.Info.LastName}</p>
                <p>Email Address: {this.state.Info.Email}</p>
                <p>FDM Employee ID: {this.state.Info.EmpID}</p>
                <p>FDM Department: {this.state.Info.EmpDept}</p>
                <Button variant="outlined" color="primary">
                    Edit your Information
                </Button>
            </div>
        )
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
        else if (text === 'Nutrition') {
            history.push('/nutrition')
        }
        else if (text === 'Mood') {
            history.push('/mood')
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
            {['Home', 'Feed', 'Mood', 'Fitness'].map((text, index) => (
            <ListItem button key={text} onClick={ () => goToSelected(text)}>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['Settings'].map((text, index) => (
            <ListItem button key={text} onClick={ () => goToSelected(text)}>
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
                Information
                </Typography>
                <Button color="inherit" onClick={() => app.auth().signOut()}>Log Out</Button>
            </Toolbar>
            </AppBar>
        </div>
    );
}