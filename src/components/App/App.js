import React, { Component } from 'react';
import './App.css';
import Signup from '../Signup/Signup.js';
import Landing from '../Landing/Landing.js';
import Todo from '../Todo/Todo.js';
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

  componentDidMount(){

}


  render() {
    return (
    <div>
      <Router>

          <Switch>

            <Route exact path='/signup' render={(props) => (
              <Signup
                {...props}
                users={this.state.user} />
            )}/>

            <Route exact path='/home/:_id' render={(props) => (
              <Landing
              />
            )}/>


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
