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
import ButtonAppBar from '../Home.js'
import './NutritionCSS.css'
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
                foodname: data.FoodName,
                calories: data.Calories
            });
        });

        this.setState({
            Food: foods,
            isLoading: false
        });
    }

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
                <td style={{ whiteSpace: 'nowrap' }}>{item.foodname}</td>
                <td>{item.calories}</td>
            </tr>
        });

        console.log(foodList)

        return (
            <div>
                <Button className="addButton" variant="outlined" color="primary" onClick={handleOpen}>
                    View Nutrition history
            </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Your Nutrition History</DialogTitle>
                    <DialogContent>
                        <table>
                            <thead>
                                <tr>
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
            </div>
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
                <Button className="addButton" onClick={() => history.push('/addfood')}>
                    Add Information
                </Button>

                <NutritionT />
            </div>
        </div >
    );
}



