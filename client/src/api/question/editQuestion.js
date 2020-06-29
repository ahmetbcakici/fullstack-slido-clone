import axios from 'axios';

import {API_URL} from '../../config';

export default ({questionId, question}) =>
  axios.patch(`${API_URL}/question`, {questionId, question});
