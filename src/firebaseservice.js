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
    }

    getUsers() {
        const db = app.database().ref("/Users");
        return db
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

    updateInfo(value, id) {
        const dbInfo = app.database().ref("/Users/" + id);
        return dbInfo.child("/Info").update(value);
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

    addPost = (post) => {
        const dbFeed = app.database().ref("/Feed");
        dbFeed.push(post);
    }

    getAllPosts() {
        const dbFeed = app.database().ref("/Feed");
        return dbFeed;
    }

    updatePost(key, value, dept, id) {
        const dbFeed = app.database().ref("/Feed/" + dept + "/" + key);
        return dbFeed.child(key).update(value);
    }

    getLike = (key) => {
        const dbLikes = app.database().ref("/Feed/" + key + "/Likes");
        return dbLikes;
    }

    addLike(like, key) {
        const dbLikes = app.database().ref("/Feed/" + key + "/Likes");
        dbLikes.push(like);
    }

    deleteLike = (key, key2) => {
        const dbLikes = app.database().ref("/Feed/" + key + "/Likes/" + key2);
        dbLikes.remove();
    }

}
export default new FirebaseService();