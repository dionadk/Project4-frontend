import React, { Component } from 'react';
import './App.css';
import Signup from '../Signup/Signup.js';
import Landing from '../Landing/Landing.js';
import Journel from '../Journel/Journel.js';
import Login from '../Login/Login.js';
import GroupLogin from '../GroupLogin/GroupLogin.js';
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  Switch
} from "react-router-dom"

class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
      users: [],
      groups: [],
      todos: [],
      user: {
        _id: null,
        email: null,
        userName: null
      }
    }
  }

  componentDidMount(){

}


  render() {
    return (
    <div>
      <Router>

          <Switch>

            <Route exact path='/' render={(props) => (
              <Signup
                {...props}
                users={this.state.user} />
            )}/>
            <Route exact path='/login' render={(props) => (
              <Login
                {...props}
                users={this.state.user} />
            )}/>

            <Route exact path='/groupLogin' render={(props) => (
              <GroupLogin
                {...props}
                users={this.state.user} />
            )}/>

            <Route exact path='/home/:_id' render={(props) => (
              <Landing
                {...props}
                users={this.state.users}
              />
            )}/>

            <Route exact path='/home/:_id/createJournels' render={(props) => (
              <Journel
                {...props}
                users={this.state.users}
              />
            )}/>

          </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
