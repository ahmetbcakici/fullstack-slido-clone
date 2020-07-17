import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId, pollId, type, answer, options, ownerParticipantId}) =>
  axios.post(`${API_URL}/poll/answer`, {
    eventId,
    pollId,
    type,
    answer,
    options,
    ownerParticipantId,
  });
