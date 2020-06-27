import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId}) =>
  axios.get(`${API_URL}/event/questions`, {params: {eventId}});
