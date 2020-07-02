import axios from 'axios';

import {API_URL} from '../../../config';

export default ({eventId, questionerId, name}) => async (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.patch(`${API_URL}/questioner`, {
        eventId,
        questionerId,
        name,
      });
      return dispatch({type: 'SET_QUESTIONER', payload: data});
    } catch (error) {
      return reject(error);
    }
  });
