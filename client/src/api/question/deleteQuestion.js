import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId, questionerId, questionId}) =>
  axios.delete(`${API_URL}/question`, {
    data: {eventId, questionerId, questionId},
  });
