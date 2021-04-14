import React from "react";
import "./AppointmentCSS.css";
import app from '../../firebaseconfig';
import ButtonAppBar from '../navBar'
import FirebaseService from '../../firebaseservice'
import moment from 'moment'

let userAuth = app.auth().currentUser;
export default class BookAppointment extends React.Component {
  emptyApp = {
    Date: '',
    FirstName: '',
    LastName: '',
    Reason: ''
  };
  constructor() {
    super();
    this.state = {
      appointment: this.emptyApp,
      info: {
        FirstName: '',
        LastName: ''
      }
    };
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
    if (userAuth !== null) {
      console.log(userAuth.uid)
    }
  }

  onDataChange = (item) => {
    console.log(item);
    let data = item.val();
    this.setState({
      info: {
        FirstName: data.FirstName,
        LastName: data.LastName
      }
    });
    console.log(this.state.appointment)
  }

  checkData = () => {
    if (this.state.datePicked !== "") {
      return "show";
    }
    return "hide";
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { start, reason } = e.target.elements;
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.appointment = {
      Date: start.value,
      FirstName: this.state.info.FirstName,
      LastName: this.state.info.LastName,
      Reason: reason.value
    };
    console.log(this.state.appointment)
    FirebaseService.addApp(this.state.appointment, start.value, userAuth.uid);
    alert("Your appointment at " + moment(start.value).format('Do MMMM YYYY') + " has been booked!")

  }

  render() {
    return (
      <div className="pageBox">
        <ButtonAppBar />
        <h3 className="fithead">Book Appointment </h3>
        <div className="App">
          <p className='BookSubtitle'> Want to book an appointment with a professional? </p>
          <form onSubmit={this.handleSubmit}>
            <label for="start">Date:   </label>
            <input
              className="textBox"
              type="date"
              name="start"
              id="start"
              min="2018-01-01"
              onChange={e => e.target.value}
              required/>{" "}
            <br />
            <br />
            <div className={this.checkData()}>
              <textarea className="textBox" name="reason" id="reason" placeholder="Reason..." onChange={e => e.target.value} required /> <br />
              <button className="bookButton" type="submit">Make appointment </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

