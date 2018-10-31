import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TodoDetail = ({ history, match, data }) => {
  const todo = data.byId[match.params.id];

  return (
    <div>
      <h2>Detail of Todo</h2>
      <button onClick={() => history.push('/')}>Home</button>

      <ul>
        <li>ID: {todo.id}</li>
        <li>Text: {todo.text}</li>
        <li>Completed: { todo.completed ? 'Yes' : 'No' }</li>
      </ul>

      <Link to={`${match.url}/edit`}>Edit</Link>
    </div>
  )
}


TodoDetail.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};


export default withRouter(TodoDetail);