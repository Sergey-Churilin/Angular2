import {LoginActionTypes, LoginActions} from './login.actions';
import {LoginState, initialLoginState} from './login.state';
import {User} from '../../../user.model';

export function loginReducer(state = initialLoginState, action: LoginActions): LoginState {
  switch (action.type) {
    case LoginActionTypes.LOGIN: {
      return {
        ...state,
        processing: true
      };
    }
    case LoginActionTypes.LOGIN_SUCCESS: {
      const userInfo = <User>action.payload;
      return {
        ...state,
        userInfo,
        processing: false,
        isLogged: true
      };
    }
    case LoginActionTypes.LOGIN_ERROR: {
      const error = action.payload;
      return {
        ...state,
        processing: false,
        isLogged: false,
        error
      };
    }
    case LoginActionTypes.LOGOUT: {
      return {
        ...state,
        processing: true
      };
    }
    case LoginActionTypes.LOGOUT_SUCCESS: {
      const userInfo = <User>action.payload;
      return {
        ...state,
        userInfo,
        processing: false,
        isLogged: false
      };
    }
    case LoginActionTypes.LOGOUT_ERROR: {
      const error = action.payload;
      return {
        ...state,
        processing: false,
        isLogged: true,
        error
      };
    }

    default:
      return state;
  }
}
