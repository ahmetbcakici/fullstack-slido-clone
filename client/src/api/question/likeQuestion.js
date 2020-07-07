import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventId,questionId,participantId}) =>
  axios.patch(`${API_URL}/question/like`, {eventId,questionId,participantId});
