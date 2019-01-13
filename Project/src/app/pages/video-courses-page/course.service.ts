import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';

import * as CoursesActions from '../../core/store/courses/courses.actions';
import {AppState} from '../../core/store';

import {Course} from './course.model';
import {DataServicesModule} from './data-services.module';

@Injectable({
  providedIn: DataServicesModule
})
export class CourseService {

  constructor(private store: Store<AppState>) { }

  updateCourse(course: Course) {
    this.store.dispatch(new CoursesActions.UpdateCourse(course));
  }

  createCourse(course: Course) {
    this.store.dispatch(new CoursesActions.CreateCourse(course));
  }

  deleteCourse(course: Course) {
    this.store.dispatch(new CoursesActions.DeleteCourse(course));
  }

  getCourse(id) {
    this.store.dispatch(new CoursesActions.GetCourse(+id));
  }

  getCourses() {
    this.store.dispatch(new CoursesActions.GetCourses());
  }

  getMoreCourses() {
    this.store.dispatch(new CoursesActions.GetCoursesMore());
  }
}
