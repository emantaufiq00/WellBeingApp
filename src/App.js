import React from 'react';
import "./App.css";
import AuthProvider from './Authentication';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './AppPages/Home'
import AccountBox from './accountBox/index';
import showNutrition from './AppPages/NutritionTracker/nutrition.js'
import Mood from './AppPages/MoodTracker/MoodTracker.js'
import AddFood from './AppPages/NutritionTracker/addFood.js'
import BookAppointment from './AppPages/Appointment.js'
import Fitness from './AppPages/FitnessTracker/fitness.js'
import UserInformation from './AppPages/userinformation.js'
import Summary from './SummaryPages/MainSummary'
import nutritionSummary from './SummaryPages/summaryNutrition.js'
import fitnessSummary from './SummaryPages/summaryFitness.js'
import moodSummary from './SummaryPages/summaryMood.js'
import Feed from './AppPages/Feed/Feed.js'



function App() {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/nutrition" component={showNutrition} />
        <PrivateRoute exact path="/mood" component={Mood} />
        <PrivateRoute exact path="/summary" component={Summary} />
        <PrivateRoute exact path="/addfood" component={AddFood} />
        <PrivateRoute exact path="/fitness" component={Fitness} />
        <PrivateRoute exact path="/information" component={UserInformation} />
        <PrivateRoute exact path="/bookappointment" component={BookAppointment} />
        <PrivateRoute exact path="/summaryNutrition" component={nutritionSummary} />
        <PrivateRoute exact path="/summaryFitness" component={fitnessSummary} />
        <PrivateRoute exact path="/summaryMood" component={moodSummary} />
        <PrivateRoute exact path="/feed" component={Feed} />
        <Route exact path="/login" component={AccountBox} />
      </Router>
    </AuthProvider>
  );
}

export default App;
