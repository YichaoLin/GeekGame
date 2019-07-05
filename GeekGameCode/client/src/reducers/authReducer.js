import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';
const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function (state = initialState, action) {

  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        // 判断payload是否为空
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
}

