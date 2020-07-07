import axios from 'axios';

import {API_URL} from '../../../config';

export default ({eventId, participantId, name}) => async (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.patch(`${API_URL}/participant`, {
        eventId,
        participantId,
        name,
      });
      return dispatch({type: 'SET_PARTICIPANT', payload: data});
    } catch (error) {
      return reject(error);
    }
  });
