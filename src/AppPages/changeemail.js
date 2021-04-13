import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import app from '../firebaseconfig';
import { useHistory } from 'react-router-dom';
import ButtonAppBar from './navBar.js'
import FirebaseService from '../firebaseservice'
let userAuth = app.auth().currentUser;

class EditEmail extends Component {


    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
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
            } else {
                console.log("User not logged in")
            }
        });
        if (userAuth !== null) {
            console.log(userAuth.uid)
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let { email, confirmemail } = e.target.elements;

        console.log(email.value)
        console.log(confirmemail.value)

        let newemail = {
            Email: email.value
        }

        if (email.value === confirmemail.value) {
            userAuth.updateEmail(email.value).then(function(user) {
                FirebaseService.updateInfo(newemail, userAuth.uid);
                alert("Email has been successfully changed")
            }, (error) => {
                alert(error.message)
            });
        } else {
            alert("Your new emails do not match.")
        }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        onChange={e => e.target.value}
                        label="New Email"
                        type="email"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirmemail"
                        name="confirmemail"
                        onChange={e => e.target.value}
                        label="Confirm New Email"
                        type="email"
                        fullWidth
                        required
                    />
                    <Button color="primary" type="submit">
                        Change Password
                    </Button>
                </form>
            </div>
        );
    }

}

export default function ChangeEmail() {
    const history = useHistory();

    return (
        <div>
            <ButtonAppBar /><br />
            <h4>Update your Password</h4>
            <EditEmail />
            <Button variant="outlined" color="primary" onClick={() => history.push('/settings')}>
                Go Back
            </Button>
        </div>
    )
}