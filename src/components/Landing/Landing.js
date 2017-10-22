import React, { Component } from 'react'
import Signup from '../Signup/Signup.js'
import Todo from '../Todo/Todo.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom"


export default class Landing extends Component {
  constructor(props){
    super(props)
    // let selectedUser = this.props.match.params._id
    // let singleUser = props.posts.filter(item => item._id === selectedUser)
        this.state = {
          todos: [],
          journal: []

        }
  }



  render () {
    return(
      <div>
        <h1>This is the landing page</h1>
        {/* <Router>
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/todo">Todo</Link>
            <Link to="/journal">Journal</Link>
          </nav>
          <Switch>
            <Route path="/todo" render={() => (
                <Todo />
              )} />

            <Route path="/journal" render={() => (
                <Journal />
              )} />

          </Switch>
        </Router> */}
      </div>

    )
  }
}
