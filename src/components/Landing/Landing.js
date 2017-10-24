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
          journels: [],
        }
        console.log(this.state.user)

        this.handleEditField = this.handleEditField.bind(this)
        this.handleTodoUpdate = this.handleTodoUpdate.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.toggleEditing = this.toggleEditing.bind(this)

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
  // editing todo
  //setting intial state
  getInitialState() {
    return {
      editing: null
    }
  }
// check if user is updating.
  handleEditField( event ) {
    if ( event.keyCode === 13 ) {
      let target = event.target,
          update = {}; //creating an empty object

      update._id = this.state.editing;
      update[ target.name ] = target.value;

      this.handleTodoUpdate( update );
    }
  }

  handleEditItem() {
    let todoId = this.state.editing;

    this.handleTodolUpdate({
      _id: todoId,
      item: this.refs[ `item_${ todoId }` ].value

    })
  }

  handleTodoUpdate (update) {

  }

  toggleEditing(todoId) {
    this.setState ({
      editing: todoId
    })
  }
// rendering edit field based on user click on item
  renderItemOrEditField( todo ) {
    if ( this.state.editing === todo._id ) {
      // Handle rendering our edit fields here.
      return <li key={ `editing-${ todo._id }` } className="list-group-item">
       <div class="flexRow">
         <div class="flexCol">
           <input
             onKeyDown={ this.handleEditField }
             type="text"
             className="form-control"
             ref={ `title_${ todo._id }` }
             name="title"
             defaultValue={ todo.item }
           />
         </div>
         <div class="flexCol">
           <button onClick={ this.handleEditItem } label="Update Item"> </button>
         </div>
       </div>
     </li>
    } else {
      return <li
        onClick={ this.toggleEditing.bind( null, todo._id ) }
        key={ todo._id }
        className="list-group-item">
        { `${ todo.item }`}
      </li>;
    }
  }
// end of todo edit
  render () {
    return(
      <div>
        <h1>Welcome {this.state.user.userName}</h1>

          <nav>
            <Link to="/home">Home</Link>
            <Link to="/todo">Create Todo</Link>
            <Link to="/journal">Create Journal</Link>
          </nav>

          {/* List of todos */}
          <section>
          <Todo
            user={this.state.user}
          />
          {/* render edit form */}
          <ul className="list-group">
          {this.state.todos.map( ( todo) => {
            return this.renderItemOrEditField( todo );
          })}
        </ul>;

          {/* <Edit
            todo={this.state.todo}
          /> */}
          {/* <ul>
              {this.state.todos.map(todo => {
                return (
                  <div className='todo'key={todo._id}>
                    <Link to={`/home/${this.state.user._id}/updateTodo`}>{todo.item} (edit) (delete)</Link>

                    <h6> Completed: {todo.isComplete}</h6>
                  </div>)
              })}
            </ul> */}
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
