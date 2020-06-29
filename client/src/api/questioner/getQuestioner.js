import axios from 'axios';

import {API_URL} from '../../config';

export default ({questionerId}) =>
  axios.get(`${API_URL}/questioner`, {params: {questionerId}});
