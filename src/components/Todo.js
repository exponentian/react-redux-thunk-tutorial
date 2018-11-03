import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const Todo = ({ num, childProps }) => {
  const { todo, deleteTodo, updateCompleted } = childProps;

  return (
    <tr>
      <td>{ num }</td>
      <td>
        <input type="checkbox" checked={todo.completed} onChange={() => updateCompleted(todo)} />
      </td>
      <td>{ todo.text }</td>
      <td>
        <Link to={`/todos/${todo.id}`}>View</Link>{' '}
        <Link to={`/todos/${todo.id}/edit`}>Edit</Link>{' '}
        <button onClick={() => deleteTodo(todo)}>Delete</button>
      </td>
    </tr>
  )
}

Todo.propTypes = {
  num: PropTypes.number.isRequired,
  childProps: PropTypes.shape({
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    updateCompleted: PropTypes.func.isRequired
  }).isRequired
};


export default Todo;
