import React, { Component } from 'react'
import Signup from '../Signup/Signup.js'
import Todo from '../Todo/Todo.js';
import Edit from '../Edit/Edit.js';
import Journel from '../Journel/Journel.js';

import axios from 'axios'
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
    let selectedUser = this.props.match.params._id

    console.log(selectedUser)
    console.log(props)
    let singleUser = props.users.filter(item => item._id === selectedUser)
        this.state = {
          user: [],
          todos: [],
          journels: []
        }
        console.log(this.state.user)

  }

  componentDidMount () {
    // console.log(this.state.singleUser)
    let selectedUser = this.props.match.params._id
    axios.get(`http://localhost:4000/api/users/${selectedUser}`)
    // .then(response => console.log(response.data.userName))
         .then(response => this.setState({
           user: response.data
         }))
         .then(response => console.log(this.state.user))
         .catch((err) => console.log(err))

    axios.get(`http://localhost:4000/api/users/${selectedUser}/todos`)
    // .then(response => console.log(response.data.userName))
        .then(response => this.setState({
          todos: response.data
        }))
        .then(response => console.log(this.state.user))
        .catch((err) => console.log(err))

    axios.get(`http://localhost:4000/api/users/${selectedUser}/journels`)
    // .then(response => console.log(response.data.userName))
        .then(response => this.setState({
          journels: response.data
        }))
        .then(response => console.log(this.state.user))
        .catch((err) => console.log(err))
  }

  render () {

    return(
      <div>
        <h1>Welcome {this.state.user.userName}</h1>

          <nav>
            <Link to="/home">Home</Link>
            <Link to="/todo">Create Todo</Link>
            <Link to="/journal">Create Journal</Link>
          </nav>
          <section>
          <Todo
            user={this.state.user}
          />
          {/* <Edit
            todo={this.state.todo}
          /> */}
          <ul>
              {this.state.todos.map(todo => {
                return (
                  <div className='todo'key={todo._id}>
                    <Link to={`/home/${this.state.user._id}/updateTodo`}>{todo.item} (edit) (delete)</Link>

                    <h6> Completed: {todo.isComplete}</h6>
                  </div>)
              })}
            </ul>
        </section>
        <div>
        <Journel
          user={this.state.user}
        />
        <ul>
            {this.state.journels.map(journel => {
              return (
                <div className='journel' key={journel._id}>
                  <Link to={`/home/${this.state.user._id}/updateJournel`}>{journel.moment} (edit) (delete)</Link>
                  <div>
                    {journel.place}
                    {journel.image}
                    {journel.date}
                  </div>
                </div>
            )})}
          </ul>
      </div>
    </div>


    )
  }
}
