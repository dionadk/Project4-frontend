import React, { Component } from 'react';
import './Landing.css';
import Todo from '../Todo/Todo.js';
import Journel from '../Journel/Journel.js';
import Group from '../Group/Group.js';

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
    // console.log(selectedUser)

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
          date: '',
          memberEmail: null
        }

        // handle edit todo functions
        this.handleEditField = this.handleEditField.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
        this.toggleEditing = this.toggleEditing.bind(this)
        this.handleDeleteItem = this.handleDeleteItem.bind(this)
        this.handleCancelEdit = this.handleCancelEdit.bind(this)
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
      let name = event.target.name
      let update = {}
      update._id = this.state.editing;
      update[ event.target.name ] = event.target.value;
          this.setState ({
            [name]: update[ event.target.name ]
          },_ => console.log(this.state, update))
  }

  handleEditItem() {
    console.log("this is not happeing")
    let todoId = this.state.editing;
    axios.post(`http://localhost:4000/api/todos/${this.state.editing}/updatetodo`,{
      item: this.state.item
    })
  }


  handleDeleteItem() {
    let todoId = this.state.editing;
    axios.post(`http://localhost:4000/api/todos/${this.state.editing}/deletetodo`)
  }

  toggleEditing(todoId) {
    this.setState ({
      editing: todoId
    })
  }
  handleCancelEdit (todoId) {
    this.setState ({
      editing: null,
      editingJournel: null

    })
  }
// rendering edit field based on user click on item
  renderItemOrEditField( todo ) {
    if ( this.state.editing === todo._id ) {
      // Handle rendering edit fields here.
      return <li key={ `${ todo._id }` } className="list-group-item">
       <div className="flexRow">
         <div className="flexCol">
           <input
             onChange={ this.handleEditField }
             type="text"
             className="form-control"
             name="item"
             defaultValue={ todo.item }
           />
         </div>
         <div className="flexCol">
           <button onClick={ this.handleEditItem } label="Update Item"> Update</button>
           <button onClick={ this.handleDeleteItem } label="Delete Item">Delete </button>
           <button onClick={ this.handleCancelEdit } label="Cancel Edit">Cancel </button>
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

    let name = event.target.name
    let update = {}
    update._id = this.state.editingJournel;
    update[ event.target.name ] = event.target.value;
    // console.log(update[ event.target.name ])
        this.setState ({
          [name]: update[ event.target.name ]
        },_ => console.log(this.state, update))

}

handleEditJournelItem() {
  console.log("this is not happeing")
  let journelId = this.state.editingJournel;

  axios.post(`http://localhost:4000/api/journels/${this.state.editingJournel}/updatejournel`,{
    moment: this.state.moment,
    place: this.state.place,
    image: this.state.image,
    date: this.state.date
  })
}

handleDeleteJournel() {
  let journelId = this.state.editingJournel;
  console.log(journelId)
  axios.post(`http://localhost:4000/api/journels/${this.state.editingJournel}/deletejournel`)
}

toggleJournelEditing(journelId) {
  this.setState ({
    editingJournel: journelId
  })
}
// rendering edit field based on user click on item
renderItemOrEditJournel( journel ) {
  console.log(journel);
  if ( this.state.editingJournel === journel._id ) {
    // Handle rendering edit fields here.
    return <li key={ `${ journel._id }` } className="list-group-item">
     <div className="flexRow">
       <div className="flexCol">
         <form className="editJournel">
           <input onChange={ this.handleEditJournelField } type="text" name="moment" defaultValue={ journel.moment } />
           <input onChange={ this.handleEditJournelField } type="text" name="place" defaultValue={ journel.place } />
           <input onChange={ this.handleEditJournelField } type="text" name="image" defaultValue={ journel.image } />
           <input onChange={ this.handleEditJournelField } type="text" name="date" defaultValue={ journel.date } />
           <div className="updateBtn">
             <button onClick={ this.handleEditJournelItem } label="Update Journel"> Update</button>
           </div>
           <div className="deleteBtn">
             <button onClick={ this.handleDeleteJournel } label="Delete Journel">Delete </button>
           </div>
           <div>
             <button onClick={ this.handleCancelEdit } label="Cancel Edit">Cancel </button>
           </div>
        </form>
       </div>

     </div>
   </li>
  } else {
    return <li
      onClick={ this.toggleJournelEditing.bind( null, journel._id ) }
      key={ journel._id }
      className="list-group-item">
      { `${ journel.moment }`} at {`${ journel.place }`}
    </li>;
  }
}
// end of journel edit
  render () {
    return(
      <div>
        <nav>
            <div className="flexrow">
                <div className="flexstretch">
                    <label className="logo">Jurno</label>
                </div>
                <div className="flexright navigation">
                    <a id="contactLnk" className="menuItem" href="/">LOGOUT</a>

                    <Link id="contactLnk" className="menuItem" to={`/home/${this.state.user._id}/createJournels`}>CREATE JOURNEL</Link>
                </div>
            </div>
        </nav>
        <h1>Welcome {this.state.user.userName}</h1>

          <div className="flexrow">
            <div className="flexcol">
              <section>
              {/* render edit journel form */}
              <ul className="list-group">
              {this.state.journels.map( ( journel) => {
                console.log(journel)
                return this.renderItemOrEditJournel( journel );
              })}
            </ul>
            </section>
            </div>
              <div className="flexcol todolist">
                <div className="flexrow">
                  <img className="todologo" src="https://i.imgur.com/JsYjyXO.png"/>
                  <label className="todoLbl">Checklist</label>
                </div>
                <section>

                  {/* create todo form */}
                <Todo
                  user={this.state.user}
                />
                {/* render edit todo form */}
                <ul className="list-group">
                {this.state.todos.map( ( todo) => {
                  console.log(todo)
                  return this.renderItemOrEditField( todo );
                })}
                </ul>
                </section>
              </div>
          </div>
          <div>
            {/* create group form */}
            <Group
              user={this.state.user}
            />
          </div>
    </div>
    )
  }
}
