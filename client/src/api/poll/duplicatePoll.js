import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId, pollId}) =>
  axios.post(`${API_URL}/poll/duplicate`, {eventId, pollId});
