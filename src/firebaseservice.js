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

    getInfo(id) {
        const dbInfo = app.database().ref("/Users/" + id + "/Info");
        return dbInfo;
    }

    updateInfo(key, value, id) {
        const dbInfo = app.database().ref("/Users/" + id + "/Info");
        return dbInfo.child(key).update(value);
    }

    addMood = (mood, id) => {
        const dbMood = app.database().ref("/Users/" + id + "/Mood");
        dbMood.push(mood);
    }

    getAllMood(id) {
        const dbMood = app.database().ref("/Users/" + id + "/Mood");
        return dbMood;
    }

    getMood(key, id) {
        const dbMood = app.database().ref("/Users/" + id + "/Mood");
        return dbMood.child(key);
    }

    updateMood(key, value, id) {
        const dbMood = app.database().ref("/Users/" + id + "/Mood");
        return dbMood.child(key).update(value);
    }

    addFitness = (fitness, id) => {
        const dbFitness = app.database().ref("/Users/" + id + "/Fitness");
        dbFitness.push(fitness);
    }

    getAllFitness(id) {
        const dbFitness = app.database().ref("/Users/" + id + "/Fitness");
        return dbFitness;
    }

    getFitness(key, id) {
        const dbFitness = app.database().ref("/Users/" + id + "/Fitness");
        return dbFitness.child(key);
    }

    updateFitness(key, value, id) {
        const dbFitness = app.database().ref("/Users/" + id + "/Fitness");
        return dbFitness.child(key).update(value);
    }

    addApp = (appoint, date, id) => {
        const dbApp = app.database().ref("/Appointments/" + date)
        dbApp.push(appoint);
    }


}
export default new FirebaseService();