import {API_URL} from '../../../config';

export default () => async (dispatch) =>
  dispatch({type: 'LOGOUT'});
