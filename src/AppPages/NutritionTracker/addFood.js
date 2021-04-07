import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import app from '../../firebaseconfig';
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
import { useHistory } from 'react-router-dom';
import FirebaseService from '../../firebaseservice';
let userAuth = app.auth().currentUser;


class AddMenu extends Component {

    emptyFood = {
        Date: '',
        Foodname: '',
        Calories: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyFood,
        };
    }

    componentWillUnmount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllFood(userAuth.uid).off("value", this.onDataChange);

            } else {
                console.log("User not logged in")
            }
            if (userAuth !== null) {
                console.log(userAuth.uid)
            }
        });
    }

    onDataChange = (item) => {
        let data = item.val();
        let food = {
            Date: data.date,
            Foodname: data.foodname,
            Calories: data.calories
        };

        this.setState({
            item: food,
        });
    }

    render() {
        const handleSubmit = async (e) => {
            e.preventDefault();
            const { date, foodname, calories } = e.target.elements;
            console.log(date.value)
            console.log(foodname.value)
            console.log(calories.value)

            this.state.item = {
                Calories: calories.value,
                Date: date.value,
                FoodName: foodname.value
            };

            console.log(this.state.item)
            FirebaseService.addFood(this.state.item, userAuth.uid);
        }

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label for="start">Date:   </label>
                    <input
                    className="textBox"
                    type="date"
                    name="date"
                    id="date"
                    min="2018-01-01"
                    onChange={e => e.target.value}
                    />{" "}
                    <br />
                    <br />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="foodname"
                        name="foodname"
                        onChange={e => e.target.value}
                        label="Name of food"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="calories"
                        name="calories"
                        onChange={e => e.target.value}
                        label="Number of calories"
                        type="text"
                        fullWidth
                    />
                    <Button color="primary" type="submit">
                        Add Information
                    </Button>
                </form>
            </div>
        );
    }

}

export default function AddFood() {
    const history = useHistory();

    return (
        <div>
            <ButtonAppBar /><br />
            <h4>Enter New Details</h4>
            <AddMenu />
            <Button variant="outlined" color="primary" onClick={() => history.push('/nutrition')}>
                Go Back
            </Button>
        </div>
    )
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
                {['Home', 'Feed', 'Fitness', 'Mood', 'Book Appointment', 'Summary'].map((text, index) => (
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
                        Nutrition Tracker
                </Typography>
                    <Button color="inherit" onClick={() => app.auth().signOut()}>Log Out</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}



