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
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { useHistory } from 'react-router-dom';

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

export function ButtonAppBar() {
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
        if (text === 'Nutrition') {
            history.push('/nutrition')
        }
        else if (text === 'Mood') {
            history.push('/mood')
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
                {['Home', 'Feed', 'Mood', 'Nutrition', 'Fitness', 'Summary'].map((text, index) => (
                    <ListItem button key={text} onClick={() => goToSelected(text)}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Settings'].map((text, index) => (
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
                            Home
                        </Typography>
                        <Button color="inherit" onClick={() => app.auth().signOut()}>Log Out</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <div align="center" alignItems="center" justifyContent="center" display="flex">
                <h2>Go to Nutrition Tracker</h2>
                <Button variant="outlined" color="primary" onClick={() => history.push('/nutrition')}>
                    Go
            </Button>
            </div>
        </div>
    );
}

export default ButtonAppBar;