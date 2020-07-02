import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId,questionId,questionerId}) =>
  axios.patch(`${API_URL}/question/like`, {eventId,questionId,questionerId});
