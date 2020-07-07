import axios from 'axios';

import {API_URL} from '../../../config';

export default ({participantId}) => async (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.get(`${API_URL}/participant`, {
        params: {participantId},
      });
      return dispatch({type: 'SET_PARTICIPANT', payload: data});
    } catch (error) {
      return reject(error);
    }
  });
