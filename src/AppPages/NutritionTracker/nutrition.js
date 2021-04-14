/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useState, Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import app from '../../firebaseconfig';
import FirebaseService from '../../firebaseservice';
import ButtonAppBar from '../navBar.js'
import './NutritionCSS.css'
import food from '../images/diet.svg'
import add from '../images/add.svg'
import historyButton from '../images/history.svg'
import graph from '../images/graph.svg'
import moment from 'moment'
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    Legend,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
let userAuth = app.auth().currentUser;




class NutritionT extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Food: [],
            isLoading: true
        };
        this.remove = this.remove.bind(this);
    }

    componentDidMount = () => {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("User is logged in")
                userAuth = user
                console.log(userAuth)
                FirebaseService.getAllFood(userAuth.uid).on("value", this.onDataChange);

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
                FirebaseService.getAllFood(userAuth.uid).off("value", this.onDataChange);

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

    async remove(key) {
        FirebaseService.delete(key)
            .then(() => {
                let updatedFood = [...this.state.Food].filter(i => i.key !== key);
                this.setState({ Food: updatedFood });
            });
    }

    onDataChange = (items) => {
        console.log(items);
        let foods = [];
        items.forEach(item => {
            let data = item.val();
            foods.push({
                key: item.key,
                date: data.Date,
                foodname: data.FoodName,
                calories: data.Calories
            });
        });

        const newList = foods.sort((b, a) => {
            return moment(b.date).diff(a.date)
        });

        this.setState({
            Food: newList,
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
        const { date, foodname, calories } = e.target.elements;
        console.log(date.value)
        console.log(foodname.value)
        console.log(calories.value)

        this.state.item = {
            Calories: calories.value,
            Date: date.value,
            FoodName: foodname.value
        };

        console.log(this.state.item)
        FirebaseService.addFood(this.state.item, userAuth.uid);
        alert("Food information has been successfully added to your summary!")
    }

    render() {
        const { isLoading, Food } = this.state;

        console.log(this.state.Food)

        const foodList = Food.map(item => {
            return <tr key={item.key}>
                <td style={{ whiteSpace: 'nowrap' }}>{moment(item.date).format('DD/MM/YYYY')}</td>
                <td>{item.foodname}</td>
                <td>{item.calories}</td>
            </tr>
        });

        console.log(Food)

        const foodGraph = []
        Food.map(item => {
            let values = item.calories * 1
            return (
                foodGraph.push({
                    calories: values,
                    date: moment(item.date).format("MMM Do"),
                })
            )
        });
        // const newGraph = foodGraph.sort((a, b) => {
        //    return moment(a.date).diff(b.date)
        // });


        console.log(foodList)

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <form className="nutritionForm" onSubmit={this.handleSubmit}>
                    <label for="start">Date:   </label>
                    <input
                        className="textBox"
                        type="date"
                        name="date"
                        id="date"
                        min="2018-01-01"
                        onChange={e => e.target.value}
                        required
                    />{" "}
                    <br />
                    <br />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="foodname"
                        name="foodname"
                        onChange={e => e.target.value}
                        label="Name of food"
                        type="text"
                        fullWidth
                        required
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="calories"
                        name="calories"
                        onChange={e => e.target.value}
                        label="Number of calories"
                        type="number"
                        fullWidth
                        required
                    />
                    <button className="addInfo" color="primary" type="submit">
                        <img className="add" src={add} alt="add Button" />
                        Add Information
                    </button>
                </form>
                <button className="viewHistory" variant="outlined" color="primary" onClick={() => this.setState({ open: true })}>
                    <img className="add" src={historyButton} alt="history Button" onClick={() => this.setState({ open: true })} />
                    View Nutrition history
                </button>
                <Dialog open={this.state.open} onClose={() => this.setState({ open: false })} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Your Nutrition History</DialogTitle>
                    <DialogContent>
                        <table>
                            <thead>
                                <tr>
                                    <th width="20%">Date</th>
                                    <th width="20%">Food Name</th>
                                    <th width="20%">Amount of Calories</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodList}
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
                        <div>
                            <div className="pageTitle"> Nutrition Intake Summary</div>
                            <div className="moodChart">
                                <ResponsiveContainer width="100%" height={500}>
                                    <ComposedChart
                                        width={500}
                                        height={400}
                                        data={foodGraph}
                                        margin={{
                                            top: 20,
                                            right: 20,
                                            bottom: 20,
                                            left: 20,
                                        }}
                                    >

                                        <CartesianGrid stroke="#e3dede" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="calories" barSize={20} fill=" rgb(201, 127, 127)" />
                                        <Legend />
                                        <Line type="monotone" dataKey="calories" stroke="#ff7300" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>


                        </div >
                    </div>
                </div>


                <div className={this.state.isClicked ? "notShow" : "show"}>


                    <button

                        onClick={this.clickeds}
                        style={{
                            backgroundColor: "rgb(126, 166, 119)",
                            position: "inline",
                            color: "white",
                            border: "none",
                            fontSize: "16px",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            fontWeight: "400",
                            marginLeft: "-53em",
                            width: "15%"
                        }}
                    >
                        <img className="graphIcon" src={graph} alt="graph Button" onClick={this.clickeds} />Summary</button>

                </div>
            </div>
        );
    }
}

export default function showNutrition() {

    return (
        <div>
            <ButtonAppBar />
            <div align="center" alignItems="center" justifyContent="center" display="flex"><br />
                <h3 className="Nutritiontitle">Nutrition Tracker</h3>
                <br />
                <img className="foodPic" src={food} alt="Gym" />
                <br />

                <NutritionT />
            </div>
        </div >
    );
}




