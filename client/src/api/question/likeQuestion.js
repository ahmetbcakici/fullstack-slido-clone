import axios from 'axios';

import {API_URL} from '../../config';

export default ({questionId,questionerId}) =>
  axios.patch(`${API_URL}/question/like`, {questionId,questionerId});
