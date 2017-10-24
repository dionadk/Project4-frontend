import React, { Component } from 'react';
import './App.css';
import Signup from '../Signup/Signup.js';
import Landing from '../Landing/Landing.js';
import Edit from '../Edit/Edit.js';
import Login from '../Login/Login.js';
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
      todos: []
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

            <Route exact path='/home/:_id' render={(props) => (

              <Landing
                {...props}
                users={this.state.users}
              />
            )}/>

            <Route exact path="/home/:_id/updateTodo" render={(props) => (
              <Edit
                {...props}
                user={this.state.users}
              />
            )} />


            {/* <Route path='/login' render={() => (
              <Login />
            )}/> */}

          </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
