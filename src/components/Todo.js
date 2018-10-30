import React from 'react';
import { Link } from 'react-router-dom';

const Todo = ({ num, childProps }) => {
  const { todo, deleteTodo, updateCompleted } = childProps;

  return (
    <tr>
      <td>{ num }</td>
      <td>
        <input type="checkbox" checked={todo.completed} onChange={() => updateCompleted(todo.id)} />
      </td>
      <td>{ todo.text }</td>
      <td>
        <Link to={`/todos/${todo.id}`}>View</Link>{' '}
        <Link to={`/todos/${todo.id}/edit`}>Edit</Link>{' '}
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </td>
    </tr>
  )
}

export default Todo;
