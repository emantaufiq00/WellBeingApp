import React from 'react';
import "./App.css";
import AuthProvider from './Authentication';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './AppPages/Home/HomePage'
import AccountBox from './accountBox/index';
import showNutrition from './AppPages/NutritionTracker/nutrition.js'
import Mood from './AppPages/MoodTracker/MoodTracker.js'
import EditPage from './AppPages/editInfo.js'
import BookAppointment from './AppPages/Appointment.js'
import Fitness from './AppPages/FitnessTracker/fitness.js'
import UserInformation from './AppPages/userinformation.js'
import Feed from './AppPages/Feed/Feed.js'
import Settings from './AppPages/Settings'
import changePass from './AppPages/changepass'
import changeEmail from './AppPages/changeemail'




function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/nutrition" component={showNutrition} />
        <PrivateRoute exact path="/mood" component={Mood} />

        <PrivateRoute exact path="/editinfo" component={EditPage} />
        <PrivateRoute exact path="/fitness" component={Fitness} />
        <PrivateRoute exact path="/information" component={UserInformation} />
        <PrivateRoute exact path="/bookappointment" component={BookAppointment} />
        <PrivateRoute exact path="/feed" component={Feed} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/changepass" component={changePass} />
        <PrivateRoute exact path="/changeemail" component={changeEmail} />
        <Route exact path="/login" component={AccountBox} />
      </Router>
    </AuthProvider>
  );
}

export default App;
