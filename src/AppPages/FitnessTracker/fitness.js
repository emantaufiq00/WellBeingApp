import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import app from '../../firebaseconfig';
import FirebaseService from '../../firebaseservice';
import './FitnessCSS.css'
import Bike from './bikese.png'
import moment from 'moment'
import ButtonAppBar from '../Home.js'

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
        console.log(items);
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
    }



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

        console.log(fitnessList)

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
                        <img src={Bike} alt="Bike" />
                        <div className="holdingDiv">
                            <label className="fieldTitle">Exercise Type :  </label>
                            <input type="text"
                                className="exerciseBox"
                                name="exercise"
                                id="exercise"
                                onChange={e => e.target.value}
                                placeholder=" Enter name" required />
                        </div>
                        <div className='kcal'>
                            <label className="fieldTitle">Calories Burnt : </label>
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
                            <label className="fieldTitle">Difficulty Level : </label>
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
                        <button className="fitButton" type='submit'>Submit Exercise</button>
                    </form>
                    <button className="fitButton" onClick={() => this.setState({ open: true })}>
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