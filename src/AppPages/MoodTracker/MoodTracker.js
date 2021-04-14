

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
import ButtonAppBar from '../navBar.js'
import add from '../images/add.svg'
import graph from '../images/graph.svg'
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';


const KawaiiContainer = styled.section`
  left: 50%;
  transform: translate(-50%);
  position: relative;
  margin-top: 200px;
  width: 150px;
`;


const renderCustomAxisTick = ({ x, y, payload }) => {
    let path = '';
    { console.log(payload) }
    if (payload.value === 1) {
        path = 'M184,0C82.544,0,0,82.544,0,184s82.544,184,184,184c101.464,0,184-82.544,184-184S285.464,0,184,0z M184,352 c-92.64,0-168-75.36-168-168S91.36,16,184,16c92.632,0,168,75.36,168,168S276.632,352,184,352z M144,152c0-13.232-10.768-24-24-24s-24,10.768-24,24s10.768,24,24,24S144,165.232,144,152z M112,152c0-4.408,3.592-8,8-8 s8,3.592,8,8s-3.592,8-8,8S112,156.408,112,152z M248,128c-13.232,0-24,10.768-24,24s10.768,24,24,24s24-10.768,24-24S261.232,128,248,128z M248,160 c-4.416,0-8-3.592-8-8s3.584-8,8-8c4.416,0,8,3.592,8,8S252.416,160,248,160z M184,224c-29.824,0-58.24,12.632-77.96,34.664c-2.944,3.296-2.664,8.352,0.624,11.296 c3.296,2.952,8.352,2.664,11.296-0.624C134.648,250.688,158.72,240,184,240c25.28,0,49.352,10.688,66.04,29.336 c1.576,1.768,3.768,2.664,5.96,2.664c1.896,0,3.816-0.672,5.336-2.04c3.288-2.944,3.568-8,0.624-11.296 C242.24,236.64,213.832,224,184,224z';

    }
    else if (payload.value === 2) {
        path = 'M184,0C82.544,0,0,82.544,0,184s82.544,184,184,184s184-82.544,184-184S285.456,0,184,0z M184,352 c-92.64,0-168-75.36-168-168S91.36,16,184,16s168,75.36,168,168S276.64,352,184,352z M144,152c0-13.232-10.768-24-24-24s-24,10.768-24,24s10.768,24,24,24S144,165.232,144,152z M120,160 c-4.408,0-8-3.592-8-8s3.592-8,8-8s8,3.592,8,8S124.408,160,120,160z M248,128c-13.232,0-24,10.768-24,24s10.768,24,24,24s24-10.768,24-24S261.232,128,248,128z M248,160 c-4.408,0-8-3.592-8-8s3.592-8,8-8c4.408,0,8,3.592,8,8S252.408,160,248,160z M184,192c-30.88,0-56,25.12-56,56v32c0,13.232,10.768,24,24,24h64c13.232,0,24-10.768,24-24v-32 C240,217.12,214.88,192,184,192z M224,280c0,4.408-3.592,8-8,8h-64c-4.408,0-8-3.592-8-8v-32c0-22.056,17.944-40,40-40 c22.056,0,40,17.944,40,40V280z';
    }
    else if (payload.value === 3) {
        path = 'M261.336,226.04c-3.296-2.952-8.36-2.664-11.296,0.624C233.352,245.312,209.288,256,184,256 c-25.28,0-49.352-10.688-66.04-29.336c-2.952-3.288-8-3.576-11.296-0.624c-3.296,2.944-3.568,8-0.624,11.296 C125.76,259.368,154.176,272,184,272c29.832,0,58.248-12.64,77.96-34.664C264.904,234.04,264.624,228.984,261.336,226.04z M184,0C82.544,0,0,82.544,0,184s82.544,184,184,184s184-82.544,184-184S285.456,0,184,0z M184,352 c-92.64,0-168-75.36-168-168S91.36,16,184,16s168,75.36,168,168S276.64,352,184,352z M248,128c-22.056,0-40,17.944-40,40c0,4.416,3.584,8,8,8c4.416,0,8-3.584,8-8c0-13.232,10.768-24,24-24s24,10.768,24,24 c0,4.416,3.584,8,8,8c4.416,0,8-3.584,8-8C288,145.944,270.056,128,248,128z M144,168c0,4.416,3.584,8,8,8s8-3.584,8-8c0-22.056-17.944-40-40-40c-22.056,0-40,17.944-40,40c0,4.416,3.584,8,8,8 s8-3.584,8-8c0-13.232,10.768-24,24-24S144,154.768,144,168z';

    }
    else if (payload.value === 4) {

        path = 'M248,112c-13.232,0-24,10.768-24,24s10.768,24,24,24s24-10.768,24-24S261.232,112,248,112z M248,144 c-4.416,0-8-3.592-8-8s3.584-8,8-8c4.416,0,8,3.592,8,8S252.416,144,248,144z M120,160c13.232,0,24-10.768,24-24s-10.768-24-24-24s-24,10.768-24,24S106.768,160,120,160z M120,128 c4.416,0,8,3.592,8,8s-3.584,8-8,8s-8-3.592-8-8S115.584,128,120,128z M184,0C82.536,0,0,82.544,0,184s82.536,184,184,184s184-82.544,184-184S285.464,0,184,0z M184,352 c-92.632,0-168-75.36-168-168S91.368,16,184,16s168,75.36,168,168S276.632,352,184,352z M264,208H104c-4.424,0-8,3.584-8,8c0,48.52,39.48,88,88,88s88-39.48,88-88C272,211.584,268.424,208,264,208z M184,288 c-37,0-67.56-28.048-71.552-64h143.104C251.56,259.952,221,288,184,288z';

    }
    else {
        path = '';
    }


    return (
        <svg x={x - 40} y={y - 10} width={100} height={100} viewBox="0 0 1024 1024" >
            <path d={path} />
        </svg>
    );
};

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
            alert("Please select a mood")
        } else {
            const unixtime = Math.round(new Date() / 1000)
            this.state.mood = {
                Emotion: this.state.moodemot,
                Time: unixtime
            }
            FirebaseService.addMood(this.state.mood, userAuth.uid);
            alert("Mood has been successfully added to your summary!")
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
        const moodStuff = []
        moodhistory.map(item => {
            let value;
            if (item.emotion === "blissful") {
                value = 4;
            }
            else if (item.emotion === "happy") {
                value = 3;
            }
            else if (item.emotion === "shocked") {
                value = 2;
            }
            else if (item.emotion === "sad") {
                value = 1;
            }
            return (
                moodStuff.push({
                    name: value,
                    date: moment(new Date(item.time * 1000)).format("MMM Do")
                })
            )

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
                                    backgroundColor: "#ff7770",
                                    border: "none",
                                    fontSize: "15px",
                                    width: "12%",
                                    borderRadius: "5px",
                                    marginTop: "1em",
                                    marginRight: "0.5em"
                                }}
                                type="submit"
                            >
                                <img className="add" src={add} alt="add Button" />
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
                                <div>
                                    <div className="pageTitle"> Mood Summary</div>
                                    <div className="moodChart">
                                        <ResponsiveContainer width="100%" height={400}>
                                            <ComposedChart
                                                width={500}
                                                height={400}
                                                data={moodStuff}
                                                margin={{
                                                    top: 20,
                                                    right: 20,
                                                    bottom: 20,
                                                    left: 20,
                                                }}
                                            >

                                                <CartesianGrid stroke="#e3dede" />
                                                <XAxis dataKey="date" />
                                                <YAxis tick={renderCustomAxisTick} />
                                                <Tooltip />
                                                <Bar dataKey="name" barSize={20} fill=" rgb(201, 127, 127" />
                                                <Line type="monotone" dataKey="name" stroke="#ff7300" />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>


                                </div >
                                {/* <table>
                                    <thead>
                                        <th>
                                            <tr width="20%">Date</tr>
                                            <tr width="20%">Moods</tr>
                                        </th>
                                    </thead>
                                    <tbody>
                                        {moodList}
                                    </tbody>
                                </table> */}
                            </div>
                        </div>

                        <div style={{ marginTop: "0.5em" }}>
                            <div
                                className={this.state.isClicked ? "notShow" : "show"}
                                onClick={this.clickeds}
                            >
                                <MoodButton
                                    style={{
                                        backgroundColor: "rgb(126, 166, 119)",
                                        border: "none",
                                        fontSize: "15px",
                                        width: "12%",
                                        borderRadius: "5px",
                                        marginRight: "4.5em"
                                    }}
                                >
                                    <img className="graphButton" src={graph} alt="graph Button" onClick={this.clickeds} />
                                    Summary
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
