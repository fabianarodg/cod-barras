// import Axios from 'axios';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const increment = () => async (dispatch) => {
  dispatch({
    type: INCREMENT_COUNTER,
  });
};

export const incrementIfOdd = () => async (dispatch, getState) => {
  const { counter } = getState();

  if (counter % 2 === 0) {
    return;
  }

  dispatch({
    type: INCREMENT_COUNTER,
  });
};
