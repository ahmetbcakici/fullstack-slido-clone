import axios from 'axios';

import {API_URL} from '../../../config';

export default ({questionerId, name}) => async (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.patch(`${API_URL}/questioner`, {
        questionerId,
        name,
      });
      return dispatch({type: 'SET_QUESTIONER', payload: data});
    } catch (error) {
      return reject(error);
    }
  });
