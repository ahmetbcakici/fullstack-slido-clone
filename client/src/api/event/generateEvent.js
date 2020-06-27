import axios from 'axios';

import {API_URL} from '../../config';

export default ({userId}) => axios.post(`${API_URL}/event`, {userId});

