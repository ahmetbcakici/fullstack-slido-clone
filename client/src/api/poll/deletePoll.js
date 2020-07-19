import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId, pollId}) =>
  axios.delete(`${API_URL}/poll`, {
    data: {eventId, pollId},
  });
