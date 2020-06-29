import axios from 'axios';

import {API_URL} from '../../config';

export default ({questionerId, name}) =>
  axios.patch(`${API_URL}/questioner`, {questionerId, name});
