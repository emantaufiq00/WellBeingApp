import React from 'react';
import "./App.css";
import AuthProvider from './Authentication';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import AccountBox from './accountBox/index';
import showNutrition from './nutrition'
import Mood from './MoodTracker'
import AddFood from './addFood'
import UserInformation from './userinformation'
import Fitness from './fitness'



function App() {
  return (
    <AuthProvider>
      <Router>
         <div>
           <PrivateRoute exact path="/" component={Home} />
           <PrivateRoute exact path="/nutrition" component={showNutrition} />
           <PrivateRoute exact path="/mood" component={Mood} />
           <PrivateRoute exact path="/addfood" component={AddFood} />
           <PrivateRoute exact path="/fitness" component={Fitness} />
           <PrivateRoute exact path="/information" component={UserInformation} />
           <Route exact path="/login" component={AccountBox} />
        </div>
      </Router>
  </AuthProvider>
  );
}

export default App;
