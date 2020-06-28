import axios from 'axios';

import {API_URL} from '../../config';

export default async ({eventCode}) => {
  const {data} = await axios.get(`${API_URL}/event/${eventCode}`);
  return data;
};