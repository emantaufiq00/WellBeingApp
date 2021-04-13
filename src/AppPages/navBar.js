
import React from 'react';
import app from '../firebaseconfig';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import './common.css'
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { useHistory } from 'react-router-dom';



function ButtonAppBar() {
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
        else if (text === 'Feed') {
            history.push('/feed')
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

        else if (text === 'Feed') {
            history.push('/feed')
        }
        else if (text === 'Settings') {
            history.push('/settings')
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
                {['Home', 'Feed', 'Mood', 'Nutrition', 'Fitness', 'Book Appointment'].map((text, index) => (
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
            <AppBar position="static" className="appBarColor">
                <Toolbar>
                    <IconButton edge="start" onClick={toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                            {list('left')}
                        </Drawer>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>

                    </Typography>
                    <Button className="logoutButton" color="inherit" onClick={() => app.auth().signOut()}>Log Out</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ButtonAppBar;