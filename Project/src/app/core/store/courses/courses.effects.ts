import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

// rxjs
import {Observable} from 'rxjs/internal/Observable';
import {concatMap, switchMap, pluck} from 'rxjs/operators';

import {DataService} from '../../../pages/video-courses-page/data-service.service';
import * as CoursesActions from './courses.actions';
import {Course} from "../../../pages/video-courses-page/course.model";

@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions, private dataService: DataService, private router: Router) {
  }

  @Effect()
  getCourses$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.GetCourses>(CoursesActions.CoursesActionTypes.GET_COURSES),
    switchMap((action: CoursesActions.GetCourses) =>
      this.dataService
        .getList()
        .then(courses => new CoursesActions.GetCoursesSuccess(courses))
        .catch(err => new CoursesActions.GetCoursesError(err)))
  );

  @Effect()
  getCoursesMore$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.GetCoursesMore>(CoursesActions.CoursesActionTypes.GET_COURSES_MORE),
    switchMap((action: CoursesActions.GetCoursesMore) =>
      this.dataService
        .getNextPage()
        .then(courses => new CoursesActions.GetCoursesMoreSuccess(courses))
        .catch(err => new CoursesActions.GetCoursesMoreError(err)))
  );

  @Effect()
  getCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.GetCourse>(CoursesActions.CoursesActionTypes.GET_COURSE),
    pluck('payload'),
    switchMap(payload =>
      this.dataService
        .getItemById(+payload)
        .then(course => new CoursesActions.GetCourseSuccess(<Course>course))
        .catch(err => new CoursesActions.GetCourseError(err)))
  );

  @Effect()
  updateCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.UpdateCourse>(CoursesActions.CoursesActionTypes.UPDATE_COURSE),
    pluck('payload'),
    concatMap((payload) =>
      this.dataService
        .updateItem(<Course>payload)
        .then(course => {
          this.router.navigate(['/courses']);
          return new CoursesActions.UpdateCourseSuccess(course);
        })
        .catch(err => new CoursesActions.UpdateCourseError(err)))
  );

  @Effect()
  createCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.CreateCourse>(CoursesActions.CoursesActionTypes.CREATE_COURSE),
    pluck('payload'),
    concatMap(payload =>
      this.dataService
        .createItem(<Course>payload)
        .then(course => {
          this.router.navigate(['/courses']);
          return new CoursesActions.CreateCourseSuccess(course);
        })
        .catch(err => new CoursesActions.CreateCourseError(err)))
  );

  @Effect()
  deleteCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.DeleteCourse>(CoursesActions.CoursesActionTypes.DELETE_COURSE),
    pluck('payload'),
    concatMap(payload =>
      this.dataService
        .removeItem(<Course>payload)
        .then(course => {
          // this.router.navigate(['/courses']);
          return new CoursesActions.DeleteCourseSuccess(course);
        })
        .catch(err => new CoursesActions.DeleteCourseError(err)))
  );
}
