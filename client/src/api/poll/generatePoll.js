import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId, question, options, type}) =>
  axios.post(`${API_URL}/poll`, {eventId, question, options, type});
