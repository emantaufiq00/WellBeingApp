

/* eslint-disable no-lone-blocks */
import React from "react";
import { Planet } from "react-kawaii";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MoodTracker.css";
import { Button as MoodButton } from "reactstrap";
import app from '../../firebaseconfig';
import FirebaseService from '../../firebaseservice';
import moment from 'moment';
import ButtonAppBar from '../Home.js'


const KawaiiContainer = styled.section`
  left: 50%;
  transform: translate(-50%);
  position: relative;
  margin-top: 200px;
  width: 150px;
`;



let userAuth = app.auth().currentUser;

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mood: {
                Emotion: "",
                Time: ""
            },
            moodemot: "",
            color: "#61DDBC",
            moodList: ["sad", "shocked", "happy", "blissful"],
            moodhistory: [],
            isClicked: false,
            isLoading: true
        };
    }

    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllMood(userAuth.uid).on("value", this.onDataChange);

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
                FirebaseService.getAllMood(userAuth.uid).off("value", this.onDataChange);

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
        let moods = [];
        items.forEach(item => {
            let data = item.val();
            moods.push({
                key: item.key,
                emotion: data.Emotion,
                time: data.Time
            });
        });

        this.setState({
            moodhistory: moods,
            isLoading: false
        });
    }

    clickeds = () => {
        this.setState({ isClicked: true });
    };

    back = () => {
        this.setState({ isClicked: false });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.moodemot === "") {
            return <p>Please select a mood</p>
        } else {
            const unixtime = Math.round(new Date() / 1000)
            this.state.mood = {
                Emotion: this.state.moodemot,
                Time: unixtime
            }
            FirebaseService.addMood(this.state.mood, userAuth.uid);
        }

    }

    render() {
        const { moodhistory, isLoading } = this.state
        const moodList = moodhistory.map(item => {
            let datet = new Date(item.time * 1000);
            const format = moment(datet).format('L');
            return <tr key={item.key}>
                <td style={{ whiteSpace: 'nowrap' }}>{format}</td>
                <td>{item.emotion}</td>
            </tr>
        });

        if (isLoading) {
            return <p>Loading...</p>
        }
        return (
            <div
                className="moodTracker-block"
                style={{ border: "2px solid transparent" }}
            >
                <div>

                    <div
                        className={
                            this.state.isClicked ? "hideEmotion" : "showEmotion"
                        }
                    >
                        <h3 className='MoodTitle'>Mood Tracker </h3>

                        <KawaiiContainer className="imageContainer">
                            <p className='MoodSubtitle'>How are you feeling today? </p>
                            <Planet mood={this.state.moodemot} color={this.state.color} />
                        </KawaiiContainer>
                        <br />

                        {this.state.moodList.map((item, index) => (
                            <button
                                key={index}
                                className="ButtonMoods"
                                onClick={() => {

                                    if (this.state.moodList.includes(item))
                                        this.setState({ mood: item });
                                    this.setState({ moodemot: item });
                                    console.log(this.state.mood)
                                }}
                            >
                                {item}
                            </button>

                        ))}

                        <form onSubmit={this.handleSubmit}>
                            <MoodButton
                                style={{
                                    backgroundColor: "#c71016",
                                    border: "none",
                                    fontSize: "15px",
                                    borderRadius: "5px",
                                    marginTop: "1em",
                                    marginRight: "0.5em"
                                }}
                                type="submit"
                            >
                                Submit Mood
                    </MoodButton>
                        </form>


                    </div>


                    <div>
                        <div
                            className={this.state.isClicked ? "boxOpened" : "boxClosed"}
                        >
                            <div>
                                <MoodButton
                                    style={{ backgroundColor: "#05386b", float: "left" }}
                                    onClick={this.back}
                                >
                                    Back
                    </MoodButton>{" "}
                                <br />
                                <table>
                                    <thead>
                                        <th>
                                            <tr width="20%">Date</tr>
                                            <tr width="20%">Moods</tr>
                                        </th>
                                    </thead>
                                    <tbody>
                                        {moodList}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div style={{ marginTop: "0.5em" }}>
                            <div
                                className={this.state.isClicked ? "notShow" : "show"}
                                onClick={this.clickeds}
                            >
                                <MoodButton
                                    style={{
                                        backgroundColor: "rgb(20,182,144)",
                                        border: "none",
                                        fontSize: "15px",
                                        borderRadius: "5px",
                                        marginRight: "4.5em"
                                    }}
                                >
                                    History
                                </MoodButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default function Mood() {
    return (
        <div>
            <ButtonAppBar />
            <Welcome />
        </div>
    )
}
