import axios from 'axios';

import {API_URL} from '../../config';

export default async ({eventCode}) => {
    /* todo: make this code block one line with return {data} */
  const {data} = await axios.get(`${API_URL}/event/${eventCode}`);
  return data;
};