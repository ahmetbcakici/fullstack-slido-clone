import axios from 'axios';

import {API_URL} from '../../../config';

export default ({questionerId}) => async (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.get(`${API_URL}/questioner`, {
        params: {questionerId},
      });
      return dispatch({type: 'SET_QUESTIONER', payload: data});
    } catch (error) {
      return reject(error);
    }
  });
