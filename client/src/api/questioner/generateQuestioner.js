import axios from 'axios';

import {API_URL} from '../../config';

export default () => axios.post(`${API_URL}/questioner`);
