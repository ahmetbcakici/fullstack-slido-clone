import axios from 'axios';

import {API_URL} from '../../../config';

export default (token) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.post(`${API_URL}/user/auth`, {
        token,
      });
      return dispatch({type: 'SET_USER', payload: data});
    } catch (error) {
      return reject(error);
    }
  });
