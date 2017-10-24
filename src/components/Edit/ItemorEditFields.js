// import React, { Component } from 'react';
//
// export default class ItemorEditField extends Component {
//   constructor (props){
//     super (props)
//   }
//
//
//   renderItemOrEditField( todo ) {
//     if ( this.state.editing === todo._id ) {
//       // Handle rendering our edit fields here.
//     } else {
//       return <li
//         onClick={ this.toggleEditing.bind( null, todo._id ) }
//         key={ todo_id }
//         className="list-group-item">
//         { `${ todo.item }`}
//       </li>;
//     }
//   }
//
//   render() {
//     return (
//       <ul className="list-group">
//       {this.props.todos.map( ( todo) => {
//         return this.renderItemOrEditField( todo );
//       })}
//     </ul>;
//   }
// )
// }
