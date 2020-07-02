import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId, questionId, question}) =>
  axios.patch(`${API_URL}/question`, {eventId, questionId, question});
