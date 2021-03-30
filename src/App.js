import React from 'react';
import "./App.css";
import AuthProvider from './Authentication';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import AccountBox from './accountBox/index';
import NutritionT from './nutrition'
import Mood from './MoodTracker'



function App() {
  return (
    <AuthProvider>
      <Router>
         <div>
           <PrivateRoute exact path="/" component={Home} />
           <PrivateRoute exact path="/nutrition" component={NutritionT} />
           <PrivateRoute exact path="/mood" component={Mood} />
           <Route exact path="/login" component={AccountBox} />
        </div>
      </Router>
  </AuthProvider>
  );
}

export default App;
