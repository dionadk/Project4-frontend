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
          editingJournel: null,
          item: '',
          moment: '',
          place: '',
          image: '',
          date: '',
          groups: [],
          groupName: '',
          memberEmail: '',
          users: [],
          creator: '',
          groups: {
            groupName: '',
            memberEmail: '',
            users: [],
            creator: '',
            groupVisible: false
          }
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
        // reload to group page
        this.reload = this.reload.bind(this)
        this.onClick = this.onClick.bind(this)

  }

  componentDidMount () {
    let selectedUser = this.props.match.params._id
    axios.get(`https://mytrip.herokuapp.com/api/users/${selectedUser}`)
         .then(response => {
           console.log(response)
           this.setState({
             user: response.data
           })
         })
         .then(response => console.log(this.state.user))
         .catch((err) => console.log(err))

    axios.get(`https://mytrip.herokuapp.com/api/users/${selectedUser}/todos`)
    // .then(response => console.log(response.data.userName))
        .then(response => this.setState({
          todos: response.data
        }))
        .then(response => console.log(this.state.user))
        .catch((err) => console.log(err))

    axios.get(`https://mytrip.herokuapp.com/api/users/${selectedUser}/journels`)

        .then(response => this.setState({
          journels: response.data
        }))
        .then(response => console.log(this.state.journels))
        .catch((err) => console.log(err))

        console.log(this.state.groups);
  axios.get(`https://mytrip.herokuapp.com/api/users/${selectedUser}/groups`)
  // axios.get(`http://localhost:4000/api/users/${selectedUser}/groups`)

      .then(response => this.setState({
        groups: response.data
      }))
      .then(response => console.log(this.state))
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
    let selectedUser = this.props.match.params._id
    let todoId = this.state.editing;
    axios.post(`https://mytrip.herokuapp.com/api/todos/${this.state.editing}/updatetodo`,{
      item: this.state.item,
      user: this.state.selectedUser

    }).then((response)=>{
      console.log(response)
      window.location.href= "/Project4-frontend/home/" + this.state.user._id;
    })
  }


  handleDeleteItem() {
    let todoId = this.state.editing;
    axios.post(`https://mytrip.herokuapp.com/api/todos/${this.state.editing}/deletetodo`)
    window.location.href= "/Project4-frontend/home/" + this.state.user._id;
  }

  toggleEditing(todo) {
    this.setState ({
      editing: todo._id,
      item: todo.item
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
       <div className="flexRow todoEdit">
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
           <button className="Btn" onClick={ this.handleEditItem } label="Update Item"> Update</button>
           <button className="Btn" onClick={ this.handleDeleteItem } label="Delete Item">Delete </button>
           <button className="Btn" onClick={ this.handleCancelEdit } label="Cancel Edit">Cancel </button>
         </div>
       </div>
     </li>
    } else {
      return <li
        onClick={ this.toggleEditing.bind( null, todo) }
        key={ todo._id }
        className="list-group-item">
        {`${ todo.item }`}
      </li>;
    }
  }
// end of todo edit

// editing journel
// check if user is updating.
handleEditJournelField( event ) {

    let name = event.target.name;
    let update = {};
    update._id = this.state.editingJournel;
    update[ event.target.name ] = event.target.value;
    // console.log(update[ event.target.name ])
        this.setState ({
          [name]: update[ event.target.name ]
        },_ => console.log(this.state, update));

}

handleEditJournelItem(e) {
  e.preventDefault()
  let selectedUser = this.props.match.params._id;
  let journelId = this.state.editingJournel;

  axios.post(`https://mytrip.herokuapp.com/api/journels/${journelId}/updatejournel`,{
    moment: this.state.moment,
    place: this.state.place,
    image: this.state.image,
    date: this.state.date,
    user: this.state.selectedUser
  }).then((response)=>{
    window.location.href= "/Project4-frontend/home/" + this.state.user._id;
  }).catch((err) => console.error(err));
}

handleDeleteJournel() {
  let journelId = this.state.editingJournel;
  axios.post(`https://mytrip.herokuapp.com/api/journels/${this.state.editingJournel}/deletejournel`);
  window.location.href= "/Project4-frontend/home/" + this.state.user._id;
}

toggleJournelEditing(journel) {
  this.setState ({
    editingJournel: journel._id,
    moment: journel.moment,
    place: journel.place,
    image: journel.image,
    date: journel.date
  })
}
// rendering edit field based on user click on item
renderItemOrEditJournel( journel ) {
  console.log(journel);
  if ( this.state.editingJournel === journel._id ) {
    // Handle rendering edit fields here.
    return <li key={ `${ journel._id }` } className="list-journel-item">
     <div className="flexRow">
       <div className="flexCol">
         <form className="editJournel">
           <div className="flexrow">
             <label>Moment</label>
             <input onChange={ this.handleEditJournelField } type="text" name="moment" defaultValue={ journel.moment } />
           </div>
             <div className="flexrow">
               <label>Location</label>
               <input onChange={ this.handleEditJournelField } type="text" name="place" defaultValue={ journel.place } />
             </div>
               <div className="flexrow">
                 <label>Image</label>
                 <input onChange={ this.handleEditJournelField } type="text" name="image" defaultValue={ journel.image } />
               </div>
                 <div className="flexrow">
                   <label>Date</label>
                   <input onChange={ this.handleEditJournelField } type="date" name="date" defaultValue={ journel.date } />
                 </div>
                 <div className="flexrow">
                   <div className="updateBtn">
                     <button className="Btn" onClick={ this.handleEditJournelItem } label="Update Journel"> Update</button>
                   </div>
                   <div className="deleteBtn">
                     <button className="Btn" onClick={ this.handleDeleteJournel } label="Delete Journel">Delete </button>
                   </div>
                   <div>
                     <button className="Btn" onClick={ this.handleCancelEdit } label="Cancel Edit">Cancel </button>
                   </div>
                 </div>
          </form>
       </div>

     </div>
   </li>
  } else {
    return <li
      onClick={ this.toggleJournelEditing.bind( null, journel ) }
      key={ journel._id }
      className="list-journel-item">
      <div className="flexrow">
        <img className="journelImg"  src={`${ journel.image }`}/>

        <div className="flexstretch journelData journelHdr">
          <div className="flexrow">
            <div className="flexstretch">
              <label>{`${ journel.place }`}</label>
            </div>
            <div><label className="journelPlace rightAlnTxt">{`${ journel.date }`}</label></div>
          </div>
          <label className="journelPlace">{`${ journel.moment }`}</label>
        </div>
      </div>
    </li>;
  }
}
// reload function
reload () {
  window.location.reload()
}
onClick () {
  console.log("hello")
this.setState({
  groupVisible: !this.state.groupVisible
})
console.log(this.state.groupVisible)
}
// end of journel edit
  render () {

    return(
      <div>
        <nav>
            <div className="flexrow">
                <div className="flexstretch">
                    <label className="logo">CaptureIt</label>
                </div>
                <div className="flexright navigation">
                    <Link id="contactLnk" className="menuItem" to={`/Project4-frontend/home/${this.state.user._id}/createJournels`}>CREATE JOURNAL</Link>
                    <a id="contactLnk" className="menuItem" href="/Project4-frontend">LOGOUT</a>
                </div>
            </div>
        </nav>
        <div className="flexrow">
          <div className="flexstretch">
            <div className="profilePic"><img src="https://i.imgur.com/Hx5sNm9.png"/></div>

              <div className="profileHdr">

                <span className="mainHdr">{this.state.user.userName}</span>
              </div>
          </div>
          <div className="flexright">
            <div className="flexrow">
              {/* <div className="memberHdr memberPic">
                <img src="https://i.imgur.com/RhRFgoN.png"/>
              </div> */}
              {/* <div className="memberHdr memberPic"> */}
              <div className="flexhdr">
                <label className="mainHdr">Shared Groups</label>
                <Link className="memeberLnk" onClick={ this.reload } to={`/Project4-frontend/home/${this.state.groups.creator}`}>{this.state.groups.groupName}</Link>
              </div>

                <button className="addMember"  onClick={() => this.onClick()}>ADD</button>
            </div>
              {
              this.state.groupVisible ?
              <div id="dialog">
                <button className="closebtn"  onClick={() => this.onClick()}>X</button>
                 <Group user={this.state.user}/>
               </div> : null

              }
          </div>
        </div>

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
    </div>
    )
  }
}
