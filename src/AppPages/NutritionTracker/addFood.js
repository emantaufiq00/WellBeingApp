import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import app from '../../firebaseconfig';
import { useHistory } from 'react-router-dom';
import FirebaseService from '../../firebaseservice';
import ButtonAppBar from '../navBar.js'
let userAuth = app.auth().currentUser;


class AddMenu extends Component {

    emptyFood = {
        Date: '',
        Foodname: '',
        Calories: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyFood,
        };
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
            if (userAuth !== null) {
                console.log(userAuth.uid)
            }
        });
    }

    onDataChange = (item) => {
        let data = item.val();
        let food = {
            Date: data.date,
            Foodname: data.foodname,
            Calories: data.calories
        };

        this.setState({
            item: food,
        });
    }

    render() {
        const handleSubmit = async (e) => {
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
        }

        return (
            <div>
                <form onSubmit={handleSubmit}>
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

export default function AddFood() {
    const history = useHistory();

    return (
        <div>
            <ButtonAppBar /><br />
            <h4>Enter New Details</h4>
            <AddMenu />
            <Button variant="outlined" color="primary" onClick={() => history.push('/nutrition')}>
                Go Back
            </Button>
        </div>
    )
}

