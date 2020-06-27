import axios from 'axios';

import {API_URL} from '../../config';

export default ({eventCode}) => axios.get(`${API_URL}/event/${eventCode}`);
