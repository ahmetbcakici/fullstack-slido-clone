import axios from 'axios';

import {API_URL} from '../../config';

export default ({questionerId, eventId, question,isAnon}) =>
  axios.post(`${API_URL}/question`, {questionerId, eventId, question,isAnon});
