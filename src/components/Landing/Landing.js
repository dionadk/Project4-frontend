import React, { Component } from 'react';
import Todo from '../Todo/Todo.js';
import Journel from '../Journel/Journel.js';

import axios from 'axios'
import {
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
    // let singleUser = props.users.filter(item => item._id === selectedUser)
        this.state = {
          user: {
            _id: null,
            email: null,
            userName: null
          },
          todos: [],
          journels: [],
          editing: null,
          editingJournel: null, // *** maybe editingTodoId
          item: '',
          moment: '',
          place: '',
          image: '',
          date: ''
        }
        console.log(this.state.user)
        // handle edit todo functions
        this.handleEditField = this.handleEditField.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.toggleEditing = this.toggleEditing.bind(this)
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        // handle edit journel functions
        this.handleEditJournelField = this.handleEditJournelField.bind(this)
        this.handleEditJournelItem = this.handleEditJournelItem.bind(this)
        this.toggleJournelEditing = this.toggleJournelEditing.bind(this)
        this.handleDeleteJournel = this.handleDeleteJournel.bind(this)

  }

  componentDidMount () {
    let selectedUser = this.props.match.params._id
    axios.get(`http://localhost:4000/api/users/${selectedUser}`)
         .then(response => {
           console.log(response) // ***Maybe something unexpected here with state
           this.setState({
             user: response.data
           })
         })
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

        .then(response => this.setState({
          journels: response.data
        }))
        .then(response => console.log(this.state.user))
        .catch((err) => console.log(err))
  }
  // editing todo
// check if user is updating.
  handleEditField( event ) {
    if ( event.keyCode === 13 ) {
      let name = event.target.name
      let update = {}
      update._id = this.state.editing;
      update[ event.target.name ] = event.target.value;
      console.log(update[ event.target.name ])
          this.setState ({
            [name]: update[ event.target.name ]
          },_ => console.log(this.state, update))
      console.log(update[ event.target.name ])
    }
  }

  handleEditItem() {
    console.log("this is not happeing")
    let todoId = this.state.editing;
    console.log(todoId)
    console.log(this.state.item)
    axios.post(`http://localhost:4000/api/todos/${this.state.editing}/updatetodo`,{
      item: this.state.item
    })
  }

  handleDeleteItem() {
    let todoId = this.state.editing;
    console.log(todoId)
    console.log(this.state.item)
    axios.post(`http://localhost:4000/api/todos/${this.state.editing}/deletetodo`)
  }

  toggleEditing(todoId) {
    this.setState ({
      editing: todoId
    })
  }
// rendering edit field based on user click on item
  renderItemOrEditField( todo ) {
    // var userId = todo.user
    console.log(todo);
    if ( this.state.editing === todo._id ) {
      // Handle rendering edit fields here.
      return <li key={ `${ todo._id }` } className="list-group-item">
       <div className="flexRow">
         <div className="flexCol">
           <input
             onKeyDown={ this.handleEditField }
             type="text"
             className="form-control"
            //  value={todo.item}
             name="item"
             defaultValue={ todo.item }
           />
         </div>
         <div className="flexCol">
           <button onClick={ this.handleEditItem } label="Update Item"> Update</button>
           <button onClick={ this.handleDeleteItem } label="Delete Item">Delete </button>
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

// editing journel
// check if user is updating.
handleEditJournelField( event ) {
  if ( event.keyCode === 13 ) {
    let name = event.target.name
    let update = {}
    update._id = this.state.editing;
    update[ event.target.name ] = event.target.value;
    console.log(update[ event.target.name ])
        this.setState ({
          [name]: update[ event.target.name ]
        },_ => console.log(this.state, update))
    console.log(update[ event.target.name ])
  }
}

handleEditJournelItem() {
  console.log("this is not happeing")
  let journelId = this.state.editingJournel;
  console.log(journelId)
  // console.log(this.state.item)
  axios.post(`http://localhost:4000/api/journels/${this.state.editingJournel}/updatejournel`,{
    moment: this.state.item,
    place: this.state.place,
    image: this.state.image,
    date: this.state.date
  })
}

handleDeleteJournel() {
  let journelId = this.state.editingJournel;
  console.log(journelId)
  // console.log(this.state.item)
  axios.post(`http://localhost:4000/api/journels/${this.state.editingJournel}/deletejournel`)
}

toggleJournelEditing(journelId) {
  this.setState ({
    editingJournel: journelId
  })
}
// rendering edit field based on user click on item
renderItemOrEditJournel( journel ) {
  // var userId = todo.user
  console.log(journel);
  if ( this.state.editingJournel === journel._id ) {
    // Handle rendering edit fields here.
    return <li key={ `${ journel._id }` } className="list-group-item">
     <div className="flexRow">
       <div className="flexCol">
         <input
           onKeyDown={ this.handleEditJournelField }
           type="text"
           className="form-control"
          //  value={todo.item}
           name="moment"
           defaultValue={ journel.moment }
         />
         <input
           onKeyDown={ this.handleEditJournelField }
           type="text"
           className="form-control"
          //  value={todo.item}
           name="place"
           defaultValue={ journel.place }
         />
         <input
           onKeyDown={ this.handleEditJournelField }
           type="text"
           className="form-control"
          //  value={todo.item}
           name="image"
           defaultValue={ journel.image }
         />
         <input
           onKeyDown={ this.handleEditJournelField }
           type="text"
           className="form-control"
          //  value={todo.item}
           name="date"
           defaultValue={ journel.date }
         />
       </div>
       <div className="flexCol">
         <button onClick={ this.handleEditJournelItem } label="Update Journel"> Update</button>
         <button onClick={ this.handleDeleteJournel } label="Delete Journel">Delete </button>
       </div>
     </div>
   </li>
  } else {
    return <li
      onClick={ this.toggleJournelEditing.bind( null, journel._id ) }
      key={ journel._id }
      className="list-group-item">
      { `${ journel.moment }`} at { `${ journel.place }`}

    </li>;
  }
}
// end of journel edit
  render () {
    return(
      <div>
        <h1>Welcome {this.state.user.userName}</h1>

          <nav>
            <Link to="/home">Home</Link>
            <Link to="/todo">Create Todo</Link>
            <Link to={`/home/${this.state.user._id}/createJournels`}>Create Journal</Link>
          </nav>
          {/* List of todos */}
          <section>
          <Todo
            user={this.state.user}
          />
          {/* render edit form */}
          <ul className="list-group">
          {this.state.todos.map( ( todo) => {
            console.log(todo)
            return this.renderItemOrEditField( todo );
          })}
        </ul>;
        </section>

          <h2>Journel Entries</h2>
          <section>
            {/* <Journel
              user={this.state.user}
            /> */}
          {/* render edit form */}
          <ul className="list-group">
          {this.state.journels.map( ( journel) => {
            console.log(journel)
            return this.renderItemOrEditJournel( journel );
          })}
        </ul>;
        </section>
    </div>
    )
  }
}
