import axios from 'axios';

import {API_URL} from '../../../config';

export default ({email, password}) => async (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: {user, token},
      } = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      localStorage.setItem('jwt', token);
      dispatch({type: 'LOGIN', payload: user});
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
