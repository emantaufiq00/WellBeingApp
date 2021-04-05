/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect, useState, Component } from 'react';
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


class NutritionT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Food: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }
    
    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllFood(userAuth.uid).on("value", this.onDataChange);

			} else {
                console.log("User not logged in")
			}
		});
        if (this.state.isLoading === true) {            
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
                FirebaseService.getAllFood(userAuth.uid).off("value", this.onDataChange);

			} else {
                console.log("User not logged in")
			}
		});
        if (this.state.isLoading === true) {            
            this.setState({ isLoading: false })
        }
        console.log(userAuth.uid)
    }

    async remove(key) {
        FirebaseService.delete(key)
        .then(() => {
            let updatedFood = [...this.state.Food].filter(i => i.key !== key);
            this.setState({Food: updatedFood});
        });
    }

    onDataChange = (items) => {
        console.log(items);
        let foods = [];
        items.forEach(item => {
            let data = item.val();
            foods.push({
                key: item.key,
                foodname: data.FoodName,
                calories: data.Calories
            });
        });
    
        this.setState({
            Food: foods,
            isLoading: false
        });
    }

    ManageDialog = () => {
        const history = useHistory();
        const { Food } = this.state;
        
        console.log(this.state.Food)
        
        const [open, setOpen] = useState(false);

    
        const handleOpen = () => {
            setOpen(true);
        };
    
        
        const handleClose = () => {
            setOpen(false);
        };

        const foodList = Food.map(item => {
            return <tr key={item.key}>
                <td style={{whiteSpace: 'nowrap'}}>{item.foodname}</td>
                <td>{item.calories}</td>
            </tr>
        });

        console.log(foodList)
    
        return (
            <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
            View Nutrition history
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Your Nutrition History</DialogTitle>
            <DialogContent>
                <table>
                    <thead>
                        <tr>
                            <th width="20%">Food Name</th>
                            <th width="20%">Amount of Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodList}
                    </tbody>
                </table>                 
            </DialogContent>
            <DialogActions><br />
                <Button onClick={handleClose} color="primary">
                Go Back
                </Button>
            </DialogActions>
            </Dialog>                            
            </div>
            );
    }
   
    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <this.ManageDialog />
            </div>
        );
    }
}

export default function showNutrition() {
    const history = useHistory();

    return (
        <div>
            <ButtonAppBar /><br />
            <div align="center" alignItems="center" justifyContent="center" display="flex"><br />
                <h2>Nutrition Tracker</h2>
                <Button variant="outlined" color="primary" onClick={ () => history.push('/addfood') }>
                    Add Information
                </Button>
                <NutritionT />
            </div>
        </div>
    );
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
        else if (text === 'Fitness') {
            history.push('/fitness')
        }
        else if (text === 'Mood') {
            history.push('/mood')
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
            {['Home', 'Feed', 'Fitness', 'Mood'].map((text, index) => (
            <ListItem button key={text} onClick={ () => goToSelected(text)}>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['Information', 'Settings'].map((text, index) => (
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
                Nutrition Tracker
                </Typography>
                <Button color="inherit" onClick={() => app.auth().signOut()}>Log Out</Button>
            </Toolbar>
            </AppBar>
        </div>
    );
}

