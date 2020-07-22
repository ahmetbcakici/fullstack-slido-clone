import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId}) =>
  axios.patch(`${API_URL}/poll/set-hide-result`, {eventId});
