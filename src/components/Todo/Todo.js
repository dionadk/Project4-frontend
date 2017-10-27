import React, { Component } from 'react';
import axios from 'axios';


export default class Todo extends Component {
  constructor(props){
    super(props)

    this.state = {
        item: '',
        isCompleted: false
      }

    this.handleSubmitTodo = this.handleSubmitTodo.bind(this)
    this.handleCreateTodo = this.handleCreateTodo.bind(this)
  }

  handleCreateTodo (e) {
    e.preventDefault()
    const name = e.target.name
    this.setState ({
      [name]: e.target.value,
      user: this.props.user._id
    })
  }

  handleSubmitTodo (e) {
    e.preventDefault()
    axios.post("http://localhost:4000/api/todos",{
      item: this.state.item,
      isCompleted: this.state.isCompleted,
      user: this.state.user,
    }).then((response)=>{
      
      console.log(response)
      // window.location.href= "/home/" + response.data._id
      window.location.href= "/home/" + this.state.user
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {

      return (
        <div>
          <div>
            <form className="flexrow" onSubmit={this.handleSubmitTodo}>
              <input name="item" type="text" placeholder="todo" onChange={this.handleCreateTodo} />
              <input name="isCompleted" id="checkBox" type="checkbox" placeholder="checkbox" onChange={this.handleCreateTodo} />
              <button className="Btn" type='submit'>ADD</button>
            </form>
          </div>
        </div>
      )
    }
  }
