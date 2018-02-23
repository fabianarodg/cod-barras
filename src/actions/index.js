// import Axios from 'axios';

export const SET_CPF = 'SET_CPF';

export const setCPF = data => async (dispatch) => {
  dispatch({
    type: SET_CPF,
    payload: data,
  });
};
