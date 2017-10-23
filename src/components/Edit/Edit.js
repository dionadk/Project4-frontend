import React, { Component } from 'react';
import axios from 'axios';


export default class Edit extends Component {
    constructor(props){
      super(props)
      let selectedUser = this.props.match.params._id
      console.log(selectedUser)
      // let singleTodo = props.todos.filter(item => item._id === selectedUser)
      this.state = {
        todo: [],
        // newItem: singleTodo[0].name
      }

        this.handleUpdateTodo = this.handleUpdateTodo.bind(this)
        this.handleSubmitTodo = this.handleSubmitTodo.bind(this)
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    }

    // componentDidMount () {
    //   // let selectedUser = this.props.match.params._id
    //   axios.get(`/api/users/${selectedUser}/updatetodo/`)
    //        .then(response => this.setState({post: response.data}))
    //        .catch((err) => console.log(err))
    //   }

    handleUpdateTodo (e) {
      e.preventDefault()
      const name = e.target.name
      // let updatePost = []
      this.setState ({
        [name]: e.target.value
      })
    }

    handleSubmitTodo(e) {
      e.preventDefault()
      axios.post(`http://localhost:4000/api/users/${this.state.user._id}/updateTodo`,{name: this.state.newName,title: this.state.newTitle,content: this.state.newContent})
        .then((response)=>{

          // after post is created redirects to edit posts page to add a tag to post
          window.location.href= "/home/" + response.data.userId;
    })
  }

    handleDeleteTodo(e) {
      e.preventDefault()
      axios.post(`http://localhost:4000/api/users/${this.state.user._id}/deleteTodo`)
        .then((response) => {
      // redirects to home page
      window.location.href= "/home/" + response.data.userId;
      })
    }

    render () {
      return (
        <div className="edit post-container ">

          <form onSubmit={this.handleSubmitTodo}>

              <input name="newTtle" type="text" value={this.state.newTitle}  onChange={this.handleUpdateTodo} />
              <button className="edit-btn" type="submit" value="Update">Update</button>
              <form onSubmit={this.handleDeleteTodo}>
                <button className="delete-btn" type="submit" value="Delete">Delete</button>
              </form>
          </form>
        </div>
      )
    }

}
