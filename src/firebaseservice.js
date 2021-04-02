import app from './firebaseconfig.jsx';


const user = app.auth().currentUser;


let foods = [];

class FirebaseService {
    constructor(props) {
        this.state = {
            emptyFood: {
                Calories: "",
                FoodName: ""
            }
        }
    }

    createUser(user, id) {
        app.database().ref("/Users/" + id + "/Info").set(user).catch(error => {
            console.log(error.message)
        });
        app.database().ref("/Users/" + id + "/Food").set(this.state.emptyFood).catch(error => {
            console.log(error.message)
        });
    }
    
    addFood = (food, id) => {
        const dbFood = app.database().ref("/Users/" + id + "/Food");
        dbFood.push(food);
    }

    getAllFood(id) {
        const dbFood = app.database().ref("/Users/" + id + "/Food");
        return dbFood;
    }

    getFood(key, id) {
        const dbFood = app.database().ref("/Users/" + id + "/Food");
        return dbFood.child(key);
    }

    updateFood(key, value, id) {
        const dbFood = app.database().ref("/Users/" + id + "/Food");
        return dbFood.child(key).update(value);
    }

    addInfo = (info, id) => {
        const dbInfo = app.database().ref("/Users/" + id + "/Info");
        dbInfo.push(info);
    }

    getAllInfo(id) {
        const dbInfo = app.database().ref("/Users/" + id + "/Info");
        return dbInfo;
    }

    getInfo(key, id) {
        const dbInfo = app.database().ref("/Users/" + id + "/Info");
        return dbInfo.child(key);
    }

    updateInfo(key, value, id) {
        const dbInfo = app.database().ref("/Users/" + id + "/Info");
        return dbInfo.child(key).update(value);
    }

    addMood = (food, id) => {
        const dbFood = app.database().ref("/Users/" + id + "/Mood");
        dbFood.push(food);
    }

    getAllMood(id) {
        const dbFood = app.database().ref("/Users/" + id + "/Mood");
        return dbFood;
    }

    getMood(key, id) {
        const dbFood = app.database().ref("/Users/" + id + "/Mood");
        return dbFood.child(key);
    }

    updateMood(key, value, id) {
        const dbFood = app.database().ref("/Users/" + id + "/Mood");
        return dbFood.child(key).update(value);
    }

    
}
export default new FirebaseService();