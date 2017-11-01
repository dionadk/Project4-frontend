import React, { Component } from 'react'
import '../Login/Login.css';
import axios from 'axios'
import {
  Link,
  Redirect,
  Switch
} from "react-router-dom"


export default class GroupLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
        email: '',
        password: '',
        groupEmail: ''
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
    axios.post("https://mytrip.herokuapp.com/api/grouplogin",{
      email: this.state.email,
      password: this.state.password,
      groupEmail: this.state.groupEmail
    }).then((response)=>{
      console.log(response)
      if(response.data == null)
      alert("Invalid user credentials or group doesnt exists");
      else
      window.location.href= "/Project4-frontend/home/" + response.data;
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    // console.log(this.state.user)
    return (
      <div className="flexrow loginrow">
          <div className="loginCol">
            <label className="logo">CaptureIt</label>
                  <div id="parent">
                       <form id="form_login" onSubmit={this.handleSubmitLogin}>
                         <div className="formLoginHeader"><label>Group Login</label></div>
                           <div>
                             <input className="loginTxt" name="email" type="text" placeholder="demo5@gmail.com - user email" onChange={this.handleCreateLogin}/>
                           </div>
                           <div>
                             <input className="loginTxt" name="groupEmail" type="text" placeholder="ali@gmail.com - group email" onChange={this.handleCreateLogin}/>
                           </div>
                           <div>
                             <input className="loginTxt" name="password" type="password" placeholder="demo5 - user pw" onChange={this.handleCreateLogin}/>
                           </div>
                             <button className="loginBtn" type="submit" value="signup">Login</button>
                       </form>
                  </div>
            <label className="copyrightLbl">&copy; Copyright 2017 dk Designs</label>
          </div>
          <div className="loginbg">
            <div className="loginDetail">
              <div>
                  <div className="flexrow">
                      <div className="flexstretch"></div>
                      <div className="flexright navigation">
                          <a id="contactLnk" className="menuItem" href="/Project4-frontend">SIGNUP</a>
                          <a id="contactLnk" className="menuItem" href="/Project4-frontend">ABOUT US</a>
                      </div>
                  </div>
              </div>
              <div className="lblCaption">
              <label >
                <span className="primaryColor">Plan your trip</span><br/>
              Jot down your moments<br/>
              <span className="primaryColor">Share you profile to other members</span></label>
            </div></div>
          </div>
      </div>
    )
  }
}
