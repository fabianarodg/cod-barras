import Axios from 'axios';

export const ADD_TODO = 'ADD_TODO';

export const addTodo = param => ({
  type: ADD_TODO,
  payload: param,
});
