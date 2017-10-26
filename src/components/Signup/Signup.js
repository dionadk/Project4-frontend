import React, { Component } from 'react'
// import { Route } from 'react-router-dom'
import './Signup.css';
import axios from 'axios'
import {
  Link,
  Redirect,
  Switch
} from "react-router-dom"


export default class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
        userName: '',
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
    console.log(`state: ${this.state.userName}`);
    console.log("hello");
    axios.post("http://localhost:4000/api/users",{
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
    }).then((response)=>{
      console.log(response);
      if(response.data == null)
        alert("user exists please login");
        else
        window.location.href= "/home/" + response.data._id;
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    // console.log(this.state.user)
    return (
        <div className="flexrow loginrow">
            <div className="loginCol">
              <label className="logo">Jurno</label>
              <div id="parent">
                <form id="form_login" onSubmit={this.handleSubmitSignup}>
                  <div className="formHeader"><label>Signup</label></div>
                  <div>
                    <input className="loginTxt" name="userName" type="text" placeholder="user name" onChange={this.handleCreateSignup}/>
                  </div>
                  <div>
                    <input className="loginTxt" name="email" type="text" placeholder="email" onChange={this.handleCreateSignup}/>
                  </div>
                  <div>
                    <input className="loginTxt" name="password" type="password" placeholder="password" onChange={this.handleCreateSignup}/>
                  </div>
                    <button className="loginBtn" type="submit" value="signup">Signup</button>
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
                            <Link to='/login' id="contactLnk" className="menuItem" href="/login">LOGIN</Link>
                            <Link to='/' id="contactLnk" className="menuItem" href="/">ABOUT US</Link>
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
