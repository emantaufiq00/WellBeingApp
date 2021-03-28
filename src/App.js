import React from 'react';
import "./App.css";
import AuthProvider from './Authentication';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import SignIn from './SignIn'
import SignUp from './SignUp'
import NutritionT from './nutrition'

function App() {
  return (
    <AuthProvider>
      <Router>
         <div>
           <PrivateRoute exact path="/" component={Home} />
           <PrivateRoute exact path="/nutrition" component={NutritionT} />
           <Route exact path="/login" component={SignIn} />
           <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
  </AuthProvider>
  );
}

export default App;
