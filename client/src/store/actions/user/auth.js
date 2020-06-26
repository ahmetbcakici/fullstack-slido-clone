import axios from 'axios';

import {API_URL} from '../../../config';

export default (token) => async (dispatch) => {
  try {
    const {data} = await axios.post(`${API_URL}/user/auth`, {
      token,
    });
    return dispatch({type: 'AUTH', payload: data});
  } catch (error) {
    return error;
  }
};
