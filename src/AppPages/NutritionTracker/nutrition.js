/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useState, Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import app from '../../firebaseconfig';
import { useHistory } from 'react-router-dom';
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

    ManageDialog = () => {
        const history = useHistory();
        const { Food } = this.state;

        console.log(this.state.Food)

        const [open, setOpen] = useState(false);


        const handleOpen = () => {
            setOpen(true);
        };


        const handleClose = () => {
            setOpen(false);
        };

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

        return (
            <div>

                <button className="viewHistory" variant="outlined" color="primary" onClick={handleOpen}>
                    <img className="add" src={historyButton} alt="history Button" onClick={handleOpen} />
                    View Nutrition history
            </button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                        <Button onClick={handleClose} color="primary">
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



            </div >
        );
    }

    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <this.ManageDialog />
            </div>
        );
    }
}

export default function showNutrition() {
    const history = useHistory();

    return (
        <div>
            <ButtonAppBar />
            <div align="center" alignItems="center" justifyContent="center" display="flex"><br />
                <h3 className="Nutritiontitle">Nutrition Tracker</h3>
                <br />
                <img className="foodPic" src={food} alt="Gym" />
                <br />

                <button className="addButton" onClick={() => history.push('/addfood')}>
                    <img className="add" src={add} alt="add Button" onClick={() => history.push('/addfood')} />

                    Add Information
                </button>

                <NutritionT />
            </div>
        </div >
    );
}



