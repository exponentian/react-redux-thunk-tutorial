import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


class TodoEdit extends React.Component {

  state = {
    todo: this.props.data.byId[this.props.match.params.id]
    //id: this.props.data.byId[this.props.match.params.id].id,
    //text: this.props.data.byId[this.props.match.params.id].text
  }

  inputTodo = e => {
    this.setState({ 
      todo: { ...this.state.todo, text: e.target.value.trim() }
    });
  }

  updateTodo = e => {
    e.preventDefault();
    
    const { todo } = this.state;
    if (todo.text.length > 0) this.props.updateTodo(todo);
  }

  render() {
    const { todo } = this.state;

    return (
      <div>
        <h2>Edit a Todo</h2>
        
        <form onSubmit={this.updateTodo}>
          <input name="todo" type="text" defaultValue={todo.text} onChange={this.inputTodo} />
          <button type="submit">Update</button>
        </form>

        <button onClick={() => this.props.history.goBack()}>Back</button>

      </div>
    );
  }
}


TodoEdit.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired
};


export default withRouter(TodoEdit);