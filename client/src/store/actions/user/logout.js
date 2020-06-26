import {API_URL} from '../../../config';

export default ({email, password}) => async (dispatch) =>
  dispatch({type: 'LOGOUT'});
