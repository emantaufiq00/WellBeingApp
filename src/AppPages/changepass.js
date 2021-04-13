import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import app from '../firebaseconfig';
import { useHistory } from 'react-router-dom';
import ButtonAppBar from './navBar.js'
let userAuth = app.auth().currentUser;


class EditPass extends Component {


    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(user)
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
        let { newpass, confirmpass } = e.target.elements;

        console.log(newpass.value)
        console.log(confirmpass.value)

        if (newpass.value === confirmpass.value) {
            userAuth.updatePassword(newpass.value).then(function(user) {
                alert("Password has been successfully changed")
            }, (error) => {
                alert(error.message)
            });
        } else {
            alert("Your new password do not match.")
        }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newpass"
                        name="newpass"
                        onChange={e => e.target.value}
                        label="New Password"
                        type="password"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="confirmpass"
                        name="confirmpass"
                        onChange={e => e.target.value}
                        label="Confirm New Password"
                        type="password"
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

export default function ChangePass() {
    const history = useHistory();

    return (
        <div>
            <ButtonAppBar /><br />
            <h4>Update your Password</h4>
            <EditPass />
            <Button variant="outlined" color="primary" onClick={() => history.push('/settings')}>
                Go Back
            </Button>
        </div>
    )
}