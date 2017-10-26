import React, { Component } from 'react';
import axios from 'axios'

export default class Group extends Component {
  constructor(props){
    super(props)

    this.state = {
      groupName: '',
      memberEmail: '',
      users: [],
      member: '',
      creator: ''
    }
    this.handleCreateGroup = this.handleCreateGroup.bind(this)
    this.handleSubmitGroup = this.handleSubmitGroup.bind(this)
    this.handleAddMember = this.handleAddMember.bind(this)
    this.handleSubmitMember = this.handleSubmitMember.bind(this)

  }

  handleCreateGroup (e) {
    e.preventDefault()
    const name = e.target.name
    this.setState ({
      [name]: e.target.value,
      creator: this.props.user._id,
      users: [this.props.user]
    })
  }

  handleAddMember (e) {
    e.preventDefault()
    const name = e.target.name
    this.setState ({
      [name]: e.target.value,
      creator: this.props.user._id

    })
  }

  handleSubmitGroup (e) {
    console.log(this.state.user)
    e.preventDefault()
    axios.post("http://localhost:4000/api/createGroup",{
      memberEmail: this.state.memberEmail,
      groupName: this.state.groupName,
      creator: this.state.creator,
      users: this.state.users
    }).then((response)=>{
      console.log(response)
      // window.location.href= "/home/" + response.data._id;
    }).catch((err) => {
      console.log(err)
    })
  }
  handleSubmitMember (e) {
    console.log(this.state.user)
    e.preventDefault()
    axios.post("http://localhost:4000/api/addMember",{
      member: this.state.addMember,
      creator: this.props.user._id
    }).then((response)=>{
      console.log(response)
      // window.location.href= "/home/" + response.data._id;
    }).catch((err) => {
      console.log(err)
    })
  }


  render () {
    return (
      <div>
        <div>
          <form className="flexrow" onSubmit={this.handleSubmitGroup}>
            <input name="groupName" type="text" placeholder="group name" onChange={this.handleCreateGroup} />
            <input name="memberEmail" type="text" placeholder="member email" onChange={this.handleCreateGroup} />
            <button type='submit'>Add Member</button>
          </form>
            <form onSubmit={this.handleSubmitMember}>
            <input name="addMember" type="text" onChange={this.handleAddMember}/>
            <button type='submit'>Add Member</button>
          </form>
        </div>
      </div>
    )
  }

}
