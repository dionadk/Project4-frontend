import React, { Component } from 'react';
import './App.css';
import Signup from '../Signup/Signup.js';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom"

class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      users: [],
      groups: []
    }
  }


  render() {
    return (
    <div>
      <Router>
        <div>
        <nav>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Switch>

          <Route path='/signup' render={() => (
            <Signup />
          )}/>

          <Route path='/login' render={() => (
            <login />
          )}/>

        </Switch>
      </div>
      </Router>
    </div>
    );
  }
}

export default App;
