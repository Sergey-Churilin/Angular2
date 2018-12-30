import {CoursesState} from './courses';
import {LoginState} from './login';

export interface AppState {
  courses: CoursesState;
  loginInfo: LoginState;
}
