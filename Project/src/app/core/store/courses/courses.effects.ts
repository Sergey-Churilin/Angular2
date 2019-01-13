import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

// rxjs
import {Observable} from 'rxjs/internal/Observable';
import {concatMap, switchMap, pluck, catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

import {DataService} from '../../../pages/video-courses-page/data-service.service';
import * as CoursesActions from './courses.actions';
import {Course} from '../../../pages/video-courses-page/course.model';

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
        .pipe(
          map(courses =>  new CoursesActions.GetCoursesSuccess(courses)),
          catchError((error) => of(new CoursesActions.GetCoursesError(error)))
        ))
  );

  @Effect()
  getCoursesMore$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.GetCoursesMore>(CoursesActions.CoursesActionTypes.GET_COURSES_MORE),
    switchMap((action: CoursesActions.GetCoursesMore) =>
      this.dataService
        .getNextPage()
        .pipe(
          map(courses =>  new CoursesActions.GetCoursesMoreSuccess(courses)),
          catchError((error) => of(new CoursesActions.GetCoursesMoreError(error)))
        ))
  );

  @Effect()
  getCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.GetCourse>(CoursesActions.CoursesActionTypes.GET_COURSE),
    pluck('payload'),
    switchMap(payload =>
      this.dataService
        .getItemById(+payload)
        .pipe(
          map(course =>  new CoursesActions.GetCourseSuccess(<Course>course)),
          catchError((error) => of(new CoursesActions.GetCourseError(error)))
        ))
  );

  @Effect()
  updateCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.UpdateCourse>(CoursesActions.CoursesActionTypes.UPDATE_COURSE),
    pluck('payload'),
    concatMap((payload) =>
      this.dataService
        .updateItem(<Course>payload)
        .pipe(
          map(course => {
            this.router.navigate(['/courses']);
            return new CoursesActions.UpdateCourseSuccess(course);
          }),
          catchError((error) => of(new CoursesActions.UpdateCourseError(error)))
        ))
  );

  @Effect()
  createCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.CreateCourse>(CoursesActions.CoursesActionTypes.CREATE_COURSE),
    pluck('payload'),
    concatMap(payload =>
      this.dataService
        .createItem(<Course>payload)
        .pipe(
          map(course => {
            this.router.navigate(['/courses']);
            return new CoursesActions.CreateCourseSuccess(course);
          }),
          catchError((error) => of(new CoursesActions.CreateCourseError(error)))
        ))
  );

  @Effect()
  deleteCourse$: Observable<Action> = this.actions$.pipe(
    ofType<CoursesActions.DeleteCourse>(CoursesActions.CoursesActionTypes.DELETE_COURSE),
    pluck('payload'),
    concatMap(payload =>
      this.dataService
        .removeItem(<Course>payload)
        .pipe(
          map(course => new CoursesActions.DeleteCourseSuccess(course)),
          catchError((error) => of(new CoursesActions.DeleteCourseError(error)))
        ))
  );
}
