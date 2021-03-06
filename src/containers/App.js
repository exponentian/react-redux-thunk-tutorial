import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import TodoList from '../components/TodoList';
import TodoDetail from '../components/TodoDetail';
import TodoEdit from '../components/TodoEdit';

import { 
  addTodo,
  deleteTodo,
  updateCompleted,
  updateTodo
} from '../actions/todos';


class App extends React.Component {

  addTodo = text => {
    this.props.addTodo(text).then(res => {
      if (res.type === 'ADD_TODO_SUCCESS') alert(res.type);
    });
  }

  deleteTodo = data => {
    this.props.deleteTodo(data).then(res => {
      if (res.type === 'DELETE_TODO_SUCCESS') alert(res.type);
    });
  }

  updateCompleted = data => {
    this.props.updateCompleted(data).then(res => {
      if (res.type === 'UPDATE_COMPLETED_SUCCESS') alert(res.type);
    });
  }

  updateTodo = data => {
    this.props.updateTodo(data).then(res => {
      if (res.type === 'UPDATE_TODO_SUCCESS') alert(res.type);
    });
  }

  render() {
    const { todos } = this.props;

    if (todos.error) {
      return <div>Please contact administrator</div>;
    }

    if (!todos.isFetched) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header />
        
        <Switch>
          <Route path='/todos/:id/edit' component={() => <TodoEdit data={todos.data} updateTodo={this.updateTodo} />} />
          <Route path='/todos/:id' component={() => <TodoDetail data={todos.data} />} />
          <Route path='/' component={() => <TodoList childProps={{ 
            data: todos.data, 
            addTodo: this.addTodo,
            deleteTodo: this.deleteTodo,
            updateCompleted: this.updateCompleted
          }} />} />
        </Switch>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});


App.propTypes = {
  todos: PropTypes.shape({
    requesting: PropTypes.bool.isRequired,
    isFetched: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired
  }).isRequired,
  addTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateCompleted: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default withRouter( connect(mapStateToProps, { 
  addTodo,
  deleteTodo,
  updateCompleted,
  updateTodo
})(App) );