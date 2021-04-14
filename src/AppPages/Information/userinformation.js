import React, { Component } from 'react';
import app from '../../firebaseconfig';
import FirebaseService from '../../firebaseservice';
import ButtonAppBar from '../navBar.js'
import edit from '../images/edit.svg'
import { useHistory } from 'react-router-dom';
import '../common.css';
import "./userInfo.css";

let userAuth = app.auth().currentUser;
console.log(userAuth);

class UserInfo extends Component {
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
                <h3 className="navTitle"> Information </h3>
                <h4>Your Information</h4>
                <p>First Name: {this.state.Info.FirstName}</p>
                <p>Last Name: {this.state.Info.LastName}</p>
                <p>Email Address: {this.state.Info.Email}</p>
                <p>FDM Employee ID: {this.state.Info.EmpID}</p>
                <p>FDM Department: {this.state.Info.EmpDept}</p>
            </div>
        )
    }
}

export default function UserInformation() {
    const history = useHistory();

    return (
        <div>
            <ButtonAppBar /><br />
            <UserInfo />
            <button className="addButton" outline="variant" color="primary" onClick={() => history.push('/editinfo')}>
                <img className="editIcon" src={edit} alt="edit Button" onClick={() => history.push('/editinfo')} />
                Edit your Information
            </button>
        </div>
    )
}
