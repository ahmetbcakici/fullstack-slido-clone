import axios from 'axios';

import {API_URL} from '../../../config';

export default ({email, password}) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: {user, token},
      } = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      
      localStorage.setItem('jwt', token);
      return dispatch({type: 'SET_USER', payload: user});
    } catch (error) {
      return reject(error);
    }
  });
