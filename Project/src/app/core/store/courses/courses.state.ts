import {Course} from '../../../pages/video-courses-page/course.model';

export interface CoursesState {
  data: ReadonlyArray<Course>;
  selectedTask: Readonly<Course>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const initialCoursesState = {
  data: [],
  selectedTask: null,
  loading: false,
  loaded: false,
  error: null
};
