import axios from 'axios';

import {API_URL} from '../../config';

export default ({pollId, answer, ownerParticipantId}) =>
  axios.post(`${API_URL}/poll/answer`, {pollId, answer, ownerParticipantId});
