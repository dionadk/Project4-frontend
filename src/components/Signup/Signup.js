import React, { Component } from 'react'
import axios from 'axios'


export default class Signup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        email: '',
        password: ''
      }

  }
  this.handleSubmitSignup = this.handleSubmitSignup.bind(this)
  this.handleCreateSignup = this.handleCreateSignup.bind(this)
}
  handleCreateSignup (e) {
    e.preventDefault()
    const name = e.target.value
    this.setState ({
      [name]: e.target.value
    })
  }

  handleSubmitSignup (e) {
    e.preventDefault()
    axios.post("http://localhost:4000/signup",{
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then((response)=>{
      console.log(response)
      window.location.href= "/";
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmitSignup}>
        <input name="userName" type="text" placeholder="user name" onChange={this.handleCreateSignup}/>
        <input name="email" type="text" placeholder="email" onChange={this.handleCreateSignup}/>
        <input name="password" type="password" placeholder="password" onChange={this.handleCreateSignup}/>
        <button type="submit" value="signup">Signup</button>
      </form>

    )
  }

}
