import uuid from 'uuid/v4';

import Api from '../middleware/api';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const ROUTE = '/todos';

export const getTodos = () => dispatch => {
    dispatch({ type: 'GET_TODOS_REQUEST' });

    Api(ROUTE).read().then(res => {
      return dispatch({ type: 'GET_TODOS_SUCCESS', data: res.data });
      
    }).catch(error => {
      return dispatch({ type: 'GET_TODOS_FAILURE', error: error.message });
    });
  };

export const addTodo = text => async dispatch => {
  dispatch({ type: 'DELETE_TODO_REQUEST' });

  const data = {
    id: uuid(),
    text,
    completed: false
  };

  try {
    const res = await Api(ROUTE).create(data);
    return delay(500).then(() => dispatch({ type: 'ADD_TODO_SUCCESS', data: res.data }));

  } catch (error) {
    return dispatch({ type: 'ADD_TODO_FAILURE', error: error.message });
  }

};

export const deleteTodo = data => async dispatch => {
  dispatch({ type: 'DELETE_TODO_REQUEST' });

  try {
    await Api(ROUTE).delete(data);
    return delay(500).then(() => dispatch({ type: 'DELETE_TODO_SUCCESS', data }));

  } catch (error) {
    return dispatch({ type: 'DELETE_TODO_FAILURE', error: error.message });
  }
};

export const updateCompleted = data => async dispatch => {
  dispatch({ type: 'UPDATE_COMPLETED_REQUEST' });

  data.completed = !data.completed;

  try {
    const res = await Api(ROUTE).update(data);
    return delay(500).then(() => dispatch({ type: 'UPDATE_COMPLETED_SUCCESS', data: res.data }));

  } catch (error) {
    return dispatch({ type: 'UPDATE_COMPLETED_FAILURE', error: error.message });
  }
};

export const updateTodo = data => async (dispatch, getState) => {
  dispatch({ type: 'UPDATE_TODO_REQUEST' });

  const todos = getState().todos.data.all;
  const todo = todos.filter(todo => todo.id === data.id)[0];
  todo.text = data.text;
  
  try {
    const res = await Api(ROUTE).update(todo);
    return delay(500).then(() => dispatch({ type: 'UPDATE_TODO_SUCCESS', data: res.data }));

  } catch (error) {
    return dispatch({ type: 'UPDATE_TODO_FAILURE', error: error.message });
  }
};
