import {User} from '../../../user.model';

export interface LoginState {
  readonly userInfo: User;
  readonly processing: boolean;
  readonly isLogged: boolean;
  readonly error: Error | string;
}

export const initialLoginState = {
  userInfo: null,
  processing: false,
  isLogged: false,
  error: null
};
