import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId, participantId, questionId}) =>
  axios.delete(`${API_URL}/question`, {
    data: {eventId, participantId, questionId},
  });
