import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId, pollId}) =>
  axios.patch(`${API_URL}/poll/set-active`, {eventId, pollId});
