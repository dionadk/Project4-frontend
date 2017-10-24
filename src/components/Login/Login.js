import React, { Component } from 'react'
import axios from 'axios'
import {
  Link,
  Redirect,
  Switch
} from "react-router-dom"


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
        email: '',
        password: ''
      }

  this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
  this.handleCreateLogin = this.handleCreateLogin.bind(this)
}
  handleCreateLogin (e) {
    e.preventDefault()
    const name = e.target.name
    this.setState ({
      [name]: e.target.value
    })
    console.log(name)
  }

  handleSubmitLogin (e) {
    e.preventDefault()
    console.log(`state: ${this.state}`);
    axios.post("http://localhost:4000/api/login",{
      email: this.state.email,
      password: this.state.password,
    }).then((response)=>{
      if(response.data == null)
      alert("Invalid user credentials");
      else
      window.location.href= "/home/" + response.data._id;
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    // console.log(this.state.user)
    return (
  <div className="loginBanner">
      <div className="flexrow headerBanner">
        <Link to="/">Signup</Link>
        <Link to="/">Login</Link>
      </div>

      <div className="headerContainer">
        <div id="parent">
          <div className="selectorBrd"></div>
            <form id="form_login" onSubmit={this.handleSubmitLogin}>
                <div>
                  <input name="email" type="text" placeholder="email" onChange={this.handleCreateLogin}/>
                </div>
                <div>
                  <input name="password" type="password" placeholder="password" onChange={this.handleCreateLogin}/>
                </div>
                  <button type="submit" value="signup">Login</button>
            </form>
        </div>
      </div>
  </div>
    )
  }
}
