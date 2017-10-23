import React, { Component } from 'react'
import './Signup.css';
import Landing from '../Landing/Landing.js'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom"


export default class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
        username: '',
        email: '',
        password: ''
      }

  this.handleSubmitSignup = this.handleSubmitSignup.bind(this)
  this.handleCreateSignup = this.handleCreateSignup.bind(this)
}
  handleCreateSignup (e) {
    e.preventDefault()
    const name = e.target.name
    this.setState ({
      [name]: e.target.value
    })
    console.log(name)
  }

  handleSubmitSignup (e) {
    e.preventDefault()
    console.log(`state: ${this.state}`);
    axios.post("http://localhost:4000/api/users",{
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }).then((response)=>{
      console.log(response)
      // window.location.href= "/home/" + response.data._id;
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    // console.log(this.state.user)
    return (
  <div className="loginBanner">
      <div className="flexrow headerBanner">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>

      <div className="headerContainer">
      <div id="parent">
        <div className="selectorBrd"></div>
          <form id="form_login" onSubmit={this.handleSubmitSignup}>
              <div>
                <input name="userName" type="text" placeholder="user name" onChange={this.handleCreateSignup}/>
              </div>
              <div>
                <input name="email" type="text" placeholder="email" onChange={this.handleCreateSignup}/>
              </div>
              <div>
                <input name="password" type="password" placeholder="password" onChange={this.handleCreateSignup}/>
              </div>
                <button type="submit" value="signup">Signup</button>
          </form>
      </div>
      </div>
      <div>
        <Landing user={this.state.user}/>
      </div>
  </div>
    )
  }

}
