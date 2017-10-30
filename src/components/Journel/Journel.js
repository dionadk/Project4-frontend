import React, { Component } from 'react'
import axios from 'axios'
import {
  Link,
  Redirect,
  Switch
} from "react-router-dom"


export default class Journel extends Component {
  constructor(props){
    super(props)
        // let selectedUser = this.props.match.params._id

    this.state = {
        moment: '',
        place: '',
        image: '',
        date: ''
      }

    this.handleSubmitJournel = this.handleSubmitJournel.bind(this)
    this.handleCreateJournel = this.handleCreateJournel.bind(this)
  }

  handleCreateJournel (e) {
    e.preventDefault()
    let selectedUser = this.props.match.params._id
    const name = e.target.name
    console.log(name)
    this.setState ({
      [name]: e.target.value,
      user: selectedUser
    })
    console.log(this.state)
  }

  handleSubmitJournel (e) {
    e.preventDefault()
    axios.post("http://localhost:4000/api/journels",{
      moment: this.state.moment,
      place: this.state.place,
      image: this.state.image,
      date: this.state.date,
      user: this.state.user,
    }).then((response)=>{
      console.log(response)
      window.location.href= "/home/" + this.state.user;

    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
let selectedUser = this.props.match.params._id
      return(
        <div className="createJournel" >
          <h1 className="profileHdr"><span>Create Journel</span></h1>
            <div className="flexrow">
              <form className="editJournel" onSubmit={this.handleSubmitJournel}>
                <div className="flexrow">
                  <label>Moment</label>
                  <input name="moment" type="text" placeholder="moment" onChange={this.handleCreateJournel} />
                </div>
                  <div className="flexrow">
                    <label>Location</label>
                    <input name="place" type="text" placeholder="place" onChange={this.handleCreateJournel} />
                  </div>
                    <div className="flexrow">
                      <label>Image</label>
                      <input name="image" type="text" placeholder="image" onChange={this.handleCreateJournel} />
                    </div>
                      <div className="flexrow">
                        <label>Date</label>
                        <input name="date" type="date" onChange={this.handleCreateJournel}/>
                      </div>
                      <div className="flexrow">
                <div className="updateBtn">
                  <button className="Btn" type='submit'>Create</button>
                </div>
                      </div>
              </form>




              {/* <form className="editJournel" onSubmit={this.handleSubmitJournel}>
                <input name="moment" type="text" placeholder="moment" onChange={this.handleCreateJournel} />
                <input name="place" type="text" placeholder="place" onChange={this.handleCreateJournel} />
                <input name="image" type="text" placeholder="image" onChange={this.handleCreateJournel} />
                <input name="date" type="date" onChange={this.handleCreateJournel}/>
              </form> */}
            </div>
        </div>
      )
    }
  }
