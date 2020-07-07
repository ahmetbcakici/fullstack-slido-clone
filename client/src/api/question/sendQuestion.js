import axios from 'axios';

import {API_URL} from '../../config';

export default ({participantId, eventId, question,isAnon}) =>
  axios.post(`${API_URL}/question`, {participantId, eventId, question,isAnon});
