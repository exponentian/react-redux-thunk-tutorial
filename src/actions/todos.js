import uuid from 'uuid/v4';

import Api from '../middleware/api';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getTodos = () => dispatch => {
    dispatch({ type: 'GET_TODOS_REQUEST' });

    Api('/todos').read().then(res => {
      return dispatch({ type: 'GET_TODOS_SUCCESS', data: res.data });
      
    }).catch(error => {
      return dispatch({ type: 'GET_TODOS_FAILURE', error: error.message });
    });
  };

export const addTodo = text => {
  return async dispatch => {
    dispatch({ type: 'DELETE_TODO_REQUEST' });

    const data = {
      id: uuid(),
      text,
      completed: false
    };

    try {
      const res = await Api('/todos').create(data);
      return delay(500).then(() => dispatch({ type: 'ADD_TODO_SUCCESS', data: res.data }));

    } catch (error) {
      return dispatch({ type: 'ADD_TODO_FAILURE', error: error.message });
    }

  };
};

export const deleteTodo = id => {
  return async dispatch => {
    dispatch({ type: 'DELETE_TODO_REQUEST' });

    try {
      await Api('/todos').delete(id);
      return delay(500).then(() => dispatch({ type: 'DELETE_TODO_SUCCESS', id }));

    } catch (error) {
      return dispatch({ type: 'DELETE_TODO_FAILURE', error: error.message });
    }
  };
};

export const updateCompleted = id => {
  return async (dispatch, getState) => {
    dispatch({ type: 'UPDATE_COMPLETED_REQUEST' });

    const todos = getState().todos.data.all;
    const data = todos.filter(todo => todo.id === id)[0];
    data.completed = !data.completed;

    try {
      const res = await Api('/todos').update(id, data);
      return delay(500).then(() => dispatch({ type: 'UPDATE_COMPLETED_SUCCESS', data: res.data }));

    } catch (error) {
      return dispatch({ type: 'UPDATE_COMPLETED_FAILURE', error: error.message });
    }
  };
};

export const updateTodo = (id, text) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'UPDATE_TODO_REQUEST' });

    const todos = getState().todos.data.all;
    const data = todos.filter(todo => todo.id === id)[0];
    data.text = text;

    try {
      const res = await Api('/todos').update(id, data);
      return delay(500).then(() => dispatch({ type: 'UPDATE_TODO_SUCCESS', data: res.data }));

    } catch (error) {
      return dispatch({ type: 'UPDATE_TODO_FAILURE', error: error.message });
    }
  };
};