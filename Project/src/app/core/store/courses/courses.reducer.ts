import {CoursesActionTypes, CoursesActions} from './courses.actions';
import {CoursesState, initialCoursesState} from './courses.state';
import {Course} from '../../../pages/video-courses-page/course.model';

export function coursesReducer(state = initialCoursesState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.GET_COURSES: {
      return {
        ...state,
        loading: true
      };
    }
    case CoursesActionTypes.GET_COURSES_SUCCESS: {
      const data = [...<Array<Course>>action.payload];
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
        selectedTask: null
      };
    }
    case CoursesActionTypes.GET_COURSES_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case CoursesActionTypes.GET_COURSES_MORE: {
      return {...state,
        loading: true};
    }
    case CoursesActionTypes.GET_COURSES_MORE_SUCCESS: {
      const moreCourses = [...<Array<Course>>action.payload];
      const data = state.data.concat(moreCourses);
      return {
        ...state,
        data,
        loading: false,
        loaded: true,
        selectedTask: null
      };
    }
    case CoursesActionTypes.GET_COURSES_MORE_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case CoursesActionTypes.GET_COURSE: {
      return {...state,
      loading: true};
    }
    case CoursesActionTypes.GET_COURSE_SUCCESS: {
      const selectedTask = <Course>action.payload;
      return {
        ...state,
        selectedTask,
        loading: false,
        loaded: true
      };
    }
    case CoursesActionTypes.GET_COURSE_ERROR: {
      const error = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case CoursesActionTypes.CREATE_COURSE: {
      return {...state};
    }
    case CoursesActionTypes.CREATE_COURSE_SUCCESS: {
      const course = {...<Course>action.payload};
      const data = [...state.data, course];
      return {
        ...state,
        data
      };
    }
    case CoursesActionTypes.CREATE_COURSE_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }
    case CoursesActionTypes.UPDATE_COURSE: {
      return {...state};
    }
    case CoursesActionTypes.UPDATE_COURSE_SUCCESS: {
      const course = <Course>action.payload;
      const data = [...state.data];
      const index = data.findIndex(c => c.id === course.id);
      data[index] = course;
      return {
        ...state,
        data
      };
    }
    case CoursesActionTypes.UPDATE_COURSE_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }
    case CoursesActionTypes.DELETE_COURSE: {
      return {...state};
    }
    case CoursesActionTypes.DELETE_COURSE_SUCCESS: {
      const course = {...<Course>action.payload};
      const data = state.data.filter(c => c.id !== course.id);
      return {
        ...state,
        data
      };
    }
    case CoursesActionTypes.DELETE_COURSE_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }
    default:
      return state;
  }
}
