import axios from 'axios';

import {API_URL} from '../../config';

export default ({pollId, answer, ownerQuestionerId}) =>
  axios.post(`${API_URL}/poll/answer`, {pollId, answer, ownerQuestionerId});
