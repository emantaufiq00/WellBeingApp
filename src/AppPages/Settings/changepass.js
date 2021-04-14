import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import app from '../../firebaseconfig'
import { useHistory } from 'react-router-dom';
import ButtonAppBar from '../navBar.js'
import FirebaseService from '../../firebaseservice'
let userAuth = app.auth().currentUser;


class EditPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                email: '',
                password: ''
            }
        }
    }


    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(user)
                console.log(userAuth)
                FirebaseService.getInfo(userAuth.uid).on("value", this.onDataChange)

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
                FirebaseService.getInfo(userAuth.uid).off("value", this.onDataChange)

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
            credentials: {
                email: data.Email,
                password: data.Password
            }
        })
        console.log(this.state.credentials)
    }

    reauthenticate = () => {
        const email = this.state.credentials.email;
        const password = this.state.credentials.password;
        const credential = app.firebase_.auth.EmailAuthProvider.credential(email, password);
        userAuth.reauthenticateWithCredential(credential);
        console.log(credential)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.reauthenticate();
        const { newpass, confirmpass } = e.target.elements;
        console.log(newpass.value)
        console.log(confirmpass.value)

        let changedpass = {
            Password: newpass.value
        }

        if (newpass.value === confirmpass.value) {
            userAuth.updatePassword(newpass.value).then(function(user) {
                FirebaseService.updateInfo(changedpass, userAuth.uid)
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