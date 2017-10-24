import React, { Component } from 'react'
import axios from 'axios'


export default class Journel extends Component {
  constructor(props){
    super(props)
        // let selectedUser = this.props.match.params._id

    this.state = {
        // user: {
        //   _id: null,
        //   email: null,
        //   userName: null
        // },
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
      window.location.href= "/home/" + response.data.user;
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {

      return(
        <div>
          <h5>Create Journel</h5>
            <div>
              <form onSubmit={this.handleSubmitJournel}>
                <input name="moment" type="text" placeholder="moment" onChange={this.handleCreateJournel} />
                <input name="place" type="text" placeholder="place" onChange={this.handleCreateJournel} />
                <input name="image" type="text" placeholder="image" onChange={this.handleCreateJournel} />
                <input name="date" type="date" onChange={this.handleCreateJournel}/>
                <button type='submit'>Create Journel</button>
              </form>
            </div>
        </div>
      )
    }
  }
