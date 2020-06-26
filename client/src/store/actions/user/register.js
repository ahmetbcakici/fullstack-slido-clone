import axios from 'axios';

import {API_URL} from '../../../config';

export default ({name, surname, email, password}) => async (dispatch) => {
  try {
    const {
      data: {user, token},
    } = await axios.post(`${API_URL}/user/register`, {
      name,
      surname,
      email,
      password,
    });
    localStorage.setItem('jwt', token);
    return dispatch({type: 'REGISTER', payload: user});
  } catch (error) {
    return error;
  }
};
