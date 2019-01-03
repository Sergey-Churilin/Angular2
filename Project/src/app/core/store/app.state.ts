import {CoursesState} from './courses';
import {LoginState} from './login';
import {AuthorsState} from './authors';

export interface AppState {
  courses: CoursesState;
  loginInfo: LoginState;
  authors: AuthorsState;
}
