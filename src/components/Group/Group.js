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
    e.preventDefault()
    axios.post("https://mytrip.herokuapp.com/api/createGroup",{
      memberEmail: this.state.memberEmail,
      groupName: this.state.groupName,
      creator: this.state.creator,
      users: this.state.users
    }).then((response)=>{
      console.log(response)
      if(response.data == null)
        alert("Group exists")
      else
      window.location.href= "/Project4-frontend/home/" + response.data.creator;
    }).catch((err) => {
      console.log(err)
    })
  }
  handleSubmitMember (e) {
    console.log(this.state.user)
    e.preventDefault()
    axios.post("https://mytrip.herokuapp.com/api/addMember",{
      member: this.state.addMember,
      creator: this.props.user._id
    }).then((response)=>{
      console.log(response)
      // window.location.href= "/home/" + response.data.creator;
    }).catch((err) => {
      console.log(err)
    })
  }


  render () {
    return (
      <div>
        <div>
          <form className="editGroup" onSubmit={this.handleSubmitGroup}>
            <div className="flexrow">
            <input className="groupTxt" name="groupName" type="text" placeholder="group Id" onChange={this.handleCreateGroup} />
            {/* <input name="memberEmail" type="text" placeholder="member email" onChange={this.handleCreateGroup} /> */}
            <button className="Btn" type='submit'>Create Group</button>
          </div>
          </form>
            <form className="editGroup" onSubmit={this.handleSubmitMember}>
            <div className="flexrow">
            <input className="groupTxt" name="addMember" type="text" onChange={this.handleAddMember}/>
            <button className="Btn" type='submit'>Add Member</button>
          </div>
          </form>
        </div>
      </div>
    )
  }

}
