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
import './formstyle.css'
import Bike from './bikese.png'
import moment from 'moment'

let userAuth = app.auth().currentUser;
 class Fitness extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            Fitness: {
             ExerciseType: '',
             CaloriesBurnt: '',
             Difficulty: '',
             DateOfExercise: ''
            },
            fitnesshistory: [],
            open: false,
            isLoading: true
        }
    }

    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllFitness(userAuth.uid).on("value", this.onDataChange);

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
                FirebaseService.getAllFitness(userAuth.uid).off("value", this.onDataChange);

			} else {
                console.log("User not logged in")
			}
            
		});
        if (userAuth !== null) {
            console.log(userAuth.uid)
        }
    }

    onDataChange = (items) => {
        console.log(items);
        let fitnesslist = [];
        items.forEach(item => {
            let data = item.val();
            fitnesslist.push({
                key: item.key,
                calories: data.CaloriesBurnt,
                date: data.DateOfExercise,
                difficulty: data.Difficulty,
                exercise: data.ExerciseType             
            });
        });
    
        this.setState({
            fitnesshistory: fitnesslist,
            isLoading: false
        });
    }
    
    handleSubmit = async(event) => {
        event.preventDefault()
        const { exercise, calories, difficulty } = event.target.elements;
        // eslint-disable-next-line react/no-direct-mutation-state
        const unixtime = Math.round(new Date()/1000);
        this.state.Fitness = {
            ExerciseType: exercise.value,
            CaloriesBurnt: calories.value,
            Difficulty: difficulty.value,
            DateOfExercise: unixtime
        };
        FirebaseService.addFitness(this.state.Fitness, userAuth.uid)
    }
    


    render() {
            const {isLoading, fitnesshistory} = this.state;
        
                
            const fitnessList = fitnesshistory.map(item => {
                let datet = new Date(item.date*1000);
                const format = moment(datet).format('L');
                return <tr key={item.key}>
                    <td style={{whiteSpace: 'nowrap'}}>{format}</td>
                    <td>{item.exercise}</td>
                    <td>{item.calories}</td>
                    <td>{item.difficulty}</td> 
                </tr>
            });
        
                console.log(fitnessList)

            if (isLoading === true) {
                return <p>Loading...</p>
            }

        return (
            <div>
                <div>
                <ButtonAppBar />
                </div><br />
                <body className = 'back' >
                    <form onSubmit={this.handleSubmit}> 
                        <h3 className= 'fithead'>Welcome to Fitness Tracker </h3> 
                        <img src={Bike} alt="Bike"/> 
                            <div className = 'type'>
                                <label>Type of exercise: </label>
                                <input type="text" 
                                    name="exercise"
                                    id="exercise"
                                    onChange ={ e => e.target.value }
                                    placeholder = "Enter name" />
                            </div>
                            <div className = 'kcal'>
                                <label>Calories burnt: </label>
                                <input type="number" min="0"
                                name="calories"
                                id="calories"
                                onChange ={ e => e.target.value }
                                placeholder = "Total calories burnt"
                                />
                            </div>
                            <div className = 'diff'>
                            <label>Difficulty level: </label>
                            <select name="difficulty"
                            id="difficulty" 
                            onChange={ e => e.target.value }>
                                <option value="" disabled selected>Select the difficulty</option>
                                <option value="very easy">Very Easy</option>
                                <option value="easy">Easy</option>
                                <option value="moderate">Moderate</option>
                                <option value="hard">Hard</option>
                                <option value="very hard">Very hard</option>
                            </select>
                            </div>
                            <button type= 'submit'>Submit Exercise</button>
                    </form>
                    <button onClick={ () => this.setState({open: true})}>
                    View Exercise History
                    </button>
                    <Dialog open={this.state.open} onClose={ () => this.setState({open: false})} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Your Nutrition History</DialogTitle>
                    <DialogContent>
                        <table>
                            <thead>
                                <tr>
                                    <th width="20%">Date of Exercise</th>
                                    <th width="20%">Exercise Performed</th>
                                    <th width="20%">No. of Calories Burned</th>
                                    <th width="20%">Difficulty of Exercise</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fitnessList}
                            </tbody>
                        </table>                 
                    </DialogContent>
                    <DialogActions><br />
                        <Button onClick={ () => this.setState({open: false})} color="primary">
                        Go Back
                        </Button>
                    </DialogActions>
                    </Dialog>   
                </body>
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
        else if (text === 'Mood') {
            history.push('/mood')
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
            {['Home', 'Feed', 'Mood', 'Nutrition'].map((text, index) => (
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

export default Fitness;
