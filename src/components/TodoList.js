import React from 'react';
import { withRouter } from 'react-router-dom';

import Todo from './Todo';

class TodoList extends React.Component {

  state = {
    text: ''
  }

  addTodo = e => {
    e.preventDefault();

    const text = this.state.text.trim();
    if ( text.length > 0 ) this.props.childProps.addTodo(text);
    
    this.setState({
      text: ''
    });
  }

  inputTodo = e => {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    const { text } = this.state;
    const { location } = this.props;
    const { data, deleteTodo, updateCompleted } = this.props.childProps;

    let status;
    if (location.pathname === '/completed') status = 'completed';
    else if (location.pathname === '/incomplete') status = 'incomplete';
    else status = 'all';

    const todos = data[status];

    return (
      <div>
        
        <h2>Todo List</h2>

        <section>
          <form onSubmit={this.addTodo}>
            <div>
              <label>Add a Todo: </label>
              <input name="todo" type="text" value={text} onChange={this.inputTodo} />
              <button type="submit">Add</button>
            </div>
          </form>
        </section>

        <br />

        <section>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Todo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { todos.map((todo, i) => <Todo key={todo.id} num={i+1} childProps={{ todo, deleteTodo, updateCompleted }} />) }
            </tbody>
          </table>

        </section>

      </div>
    );
  }
}

export default withRouter(TodoList);