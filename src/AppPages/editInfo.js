import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import app from '../firebaseconfig';
import { useHistory } from 'react-router-dom';
import FirebaseService from '../firebaseservice';
import ButtonAppBar from './navBar.js'
let userAuth = app.auth().currentUser;


class EditInfo extends Component {


    constructor(props) {
        super(props);
        this.state = {
            Info: {
                FirstName: "",
                LastName: "",
                Email: "",
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
                FirebaseService.getInfo(userAuth.uid).on("value", this.onDataChange);

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
                FirebaseService.getInfo(userAuth.uid).off("value", this.onDataChange);

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
            EmpDept: data.EmpDept
        };

        this.setState({
            Info: info,
            isLoading: false
        });

        console.log(this.state.Info);
    }

    render() {
        const handleSubmit = async (e) => {
            e.preventDefault();
            let { firstname, lastname, email, dept } = e.target.elements;
            console.log(firstname.value)
            console.log(lastname.value)
            console.log(email.value)
            console.log(dept.value)

            if (firstname.value === "") {
                firstname.value = this.state.Info.FirstName
            }
            if (lastname.value === "") {
                lastname.value = this.state.Info.LastName
            }
            if (email.value === "") {
                email.value = this.state.Info.Email
            }
            if (dept.value === "") {
                dept.value = this.state.Info.EmpDept
            }

            this.state.item = {
                Email: email.value,
                EmpDept: dept.value,
                FirstName: firstname.value,
                LastName: lastname.value
            };

            console.log(this.state.item)
            FirebaseService.updateInfo(this.state.item, userAuth.uid);
        }

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        onChange={e => e.target.value}
                        label="Your First Name"
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        onChange={e => e.target.value}
                        label="Your last name"
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        onChange={e => e.target.value}
                        label="Your email address"
                        type="email"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="dept"
                        name="dept"
                        onChange={e => e.target.value}
                        label="Your department"
                        type="text"
                        fullWidth
                        required
                    />
                    <Button color="primary" type="submit">
                        Add Information
                    </Button>
                </form>
            </div>
        );
    }

}

export default function EditPage() {
    const history = useHistory();

    return (
        <div>
            <ButtonAppBar /><br />
            <h4>Update your Information</h4>
            <EditInfo />
            <Button variant="outlined" color="primary" onClick={() => history.push('/information')}>
                Go Back
            </Button>
        </div>
    )
}

