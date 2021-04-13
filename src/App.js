import React from 'react';
import "./App.css";
import AuthProvider from './Authentication';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './AppPages/Home/HomePage'
import AccountBox from './accountBox/index';
import showNutrition from './AppPages/NutritionTracker/nutrition.js'
import Mood from './AppPages/MoodTracker/MoodTracker.js'
import EditPage from './AppPages/Information/editInfo.js'
import BookAppointment from './AppPages/AppointmentBooker/Appointment.js'
import Fitness from './AppPages/FitnessTracker/fitness.js'
import UserInformation from './AppPages/Information/userinformation.js'
import Summary from './SummaryPages/MainSummary'
import nutritionSummary from './SummaryPages/summaryNutrition.js'
import fitnessSummary from './SummaryPages/summaryFitness.js'
import moodSummary from './SummaryPages/summaryMood.js'
import Feed from './AppPages/Feed/Feed.js'
import Settings from './AppPages/Settings/Settings'
import changePass from './AppPages/Settings/changepass.js'
import changeEmail from './AppPages/Settings/changeemail.js'




function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/nutrition" component={showNutrition} />
        <PrivateRoute exact path="/mood" component={Mood} />
        <PrivateRoute exact path="/summary" component={Summary} />
        <PrivateRoute exact path="/editinfo" component={EditPage} />
        <PrivateRoute exact path="/fitness" component={Fitness} />
        <PrivateRoute exact path="/information" component={UserInformation} />
        <PrivateRoute exact path="/bookappointment" component={BookAppointment} />
        <PrivateRoute exact path="/summaryNutrition" component={nutritionSummary} />
        <PrivateRoute exact path="/summaryFitness" component={fitnessSummary} />
        <PrivateRoute exact path="/feed" component={Feed} />
        <PrivateRoute exact path="/summaryMood" component={moodSummary} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/changepass" component={changePass} />
        <PrivateRoute exact path="/changeemail" component={changeEmail} />
        <Route exact path="/login" component={AccountBox} />
      </Router>
    </AuthProvider>
  );
}

export default App;
