import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import app from '../../firebaseconfig';
import FirebaseService from '../../firebaseservice';
import './FitnessCSS.css'
// import Gym from '../images/fitnessGym.png'
import Gym from '../images/sport.svg'
import tap from '../images/tap.svg'
import moment from 'moment'
import ButtonAppBar from '../navBar.js'
import historyButton from '../images/history.svg'
import graph from '../images/graph.svg'
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

let userAuth = app.auth().currentUser;
class Fitness extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Fitness: {
                ExerciseType: '',
                CaloriesBurnt: '',
                Difficulty: '',
                DateOfExercise: ''
            },
            fitnesshistory: [],
            open: false,
            isLoading: true
        }
    }

    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllFitness(userAuth.uid).on("value", this.onDataChange);

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
                FirebaseService.getAllFitness(userAuth.uid).off("value", this.onDataChange);

            } else {
                console.log("User not logged in")
            }

        });
        if (userAuth !== null) {
            console.log(userAuth.uid)
        }
    }

    onDataChange = (items) => {
        let fitnesslist = [];
        items.forEach(item => {
            let data = item.val();
            fitnesslist.push({
                key: item.key,
                calories: data.CaloriesBurnt,
                date: data.DateOfExercise,
                difficulty: data.Difficulty,
                exercise: data.ExerciseType
            });
        });

        this.setState({
            fitnesshistory: fitnesslist,
            isLoading: false
        });

        console.log(fitnesslist)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { exercise, calories, difficulty } = event.target.elements;
        // eslint-disable-next-line react/no-direct-mutation-state
        const unixtime = Math.round(new Date() / 1000);
        this.state.Fitness = {
            ExerciseType: exercise.value,
            CaloriesBurnt: calories.value,
            Difficulty: difficulty.value,
            DateOfExercise: unixtime
        };
        FirebaseService.addFitness(this.state.Fitness, userAuth.uid)
        alert("Workout has been successfully added to your summary!")
    }

    clickeds = () => {
        this.setState({ isClicked: true });
    };

    back = () => {
        this.setState({ isClicked: false });
    };


    render() {
        const { isLoading, fitnesshistory } = this.state;


        const fitnessList = fitnesshistory.map(item => {
            let datet = new Date(item.date * 1000);
            const format = moment(datet).format('L');
            return <tr key={item.key}>
                <td style={{ whiteSpace: 'nowrap' }}>{format}</td>
                <td>{item.exercise}</td>
                <td>{item.calories}</td>
                <td>{item.difficulty}</td>
            </tr>
        });

        console.log(fitnesshistory)

        let fitnessGraph = []
        fitnesshistory.map(item => {
            let values = item.calories * 1
            return (
                fitnessGraph.push({
                    burnt: values,
                    date: moment(new Date(item.date * 1000)).format("MMM Do")
                })
            )

        });


        console.log(fitnessGraph)

        if (isLoading === true) {
            return <p>Loading...</p>
        }

        return (
            <div>
                <div>
                    <h3 className='fithead'>Fitness Tracker </h3>
                </div><br />
                <body className='back' >
                    <form onSubmit={this.handleSubmit}>
                        <img className="gymPic" src={Gym} alt="Gym" />
                        <div className="holdingDiv">
                            <label className="fieldTitle">Exercise Type: &nbsp; </label>
                            <input type="text"
                                className="exerciseBox"
                                name="exercise"
                                id="exercise"
                                onChange={e => e.target.value}
                                placeholder=" Enter exercise" required />
                        </div>
                        <div className='kcal'>
                            <label className="fieldTitle">Calories Burnt: &nbsp;</label>
                            <input type="number" min="0"
                                className="exerciseBox"
                                name="calories"
                                id="calories"
                                onChange={e => e.target.value}
                                placeholder="Total calories burnt"
                                required
                            />
                        </div>
                        <div className='diff'>
                            <label className="fieldTitle">Difficulty Level: &nbsp; </label>
                            <select name="difficulty"
                                className="exerciseBox"
                                id="difficulty"
                                onChange={e => e.target.value} required>
                                <option value="" disabled selected>Select the difficulty</option>
                                <option value="very easy">Very Easy</option>
                                <option value="easy">Easy</option>
                                <option value="moderate">Moderate</option>
                                <option value="hard">Hard</option>
                                <option value="very hard">Very hard</option>
                            </select>
                        </div>

                        <button className="fitButton" type='submit'>
                            <img className="submitIcon" src={tap} alt="submit Button" />Submit Exercise
                        </button>
                    </form>

                    <button className="viewHistoryButton" onClick={() => this.setState({ open: true })}>
                        <img className="historyIcon" src={historyButton} alt="history Button" onClick={() => this.setState({ open: true })} />
                        View Exercise History
                    </button>
                    <Dialog open={this.state.open} onClose={() => this.setState({ open: false })} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Your Nutrition History</DialogTitle>
                        <DialogContent>
                            <table>
                                <thead>
                                    <tr>
                                        <th width="20%">Date of Exercise</th>
                                        <th width="20%">Exercise Performed</th>
                                        <th width="20%">No. of Calories Burned</th>
                                        <th width="20%">Difficulty of Exercise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fitnessList}
                                </tbody>
                            </table>
                        </DialogContent>
                        <DialogActions><br />
                            <Button onClick={() => this.setState({ open: false })} color="primary">
                                Go Back
                        </Button>
                        </DialogActions>
                    </Dialog>


                    <div
                        className={this.state.isClicked ? "boxOpened" : "boxClosed"}
                    >
                        <div>
                            <button
                                style={{
                                    backgroundColor: "rgb(126, 166, 119)",
                                    color: "white",
                                    border: "none",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    padding: "5px 10px",
                                    fontWeight: "400",
                                    marginRight: "4.5em",
                                    float: "left"
                                }}
                                onClick={this.back}
                            >
                                Back
                    </button>{" "}
                            <br />

                            <div className="pageTitle"> Fitness Summary</div>
                            <div className="moodChart">
                                <ResponsiveContainer width="99%" height={400} >
                                    <ComposedChart
                                        width={500}
                                        height={700}
                                        data={fitnessGraph}
                                        margin={{
                                            top: 20,
                                            right: 20,
                                            bottom: 20,
                                            left: 20,
                                        }}
                                    >

                                        <CartesianGrid stroke="#e3dede" />
                                        <XAxis dataKey='date' />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey='burnt' barSize={20} fill="rgb(201, 127, 127)" />
                                        <Line type="monotone" dataKey="burnt" stroke="#ff7300" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>




                        </div>
                    </div>

                    <div style={{ marginTop: "0.5em" }}>
                        <div
                            className={this.state.isClicked ? "notShow" : "show"}
                            onClick={this.clickeds}
                        >



                            <button
                                style={{
                                    backgroundColor: "rgb(126, 166, 119)",
                                    color: "white",
                                    border: "none",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    padding: "5px 10px",
                                    fontWeight: "400",
                                    marginRight: "8em",
                                    width: "16%",
                                    textAlign: "center"

                                }}
                            >
                                <img className="graphIcon" src={graph} alt="summary Button" onClick={this.clickeds} />
                                Summary
                                </button>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}


export default function Mood() {
    return (
        <div>
            <ButtonAppBar />
            <Fitness />
        </div>
    )
}