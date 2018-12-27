import { Injectable } from '@angular/core';
import {Course} from './course.model';


const courses = [
  new Course(1, 'Course1', 55, 'Best Course', false, new Date(2018, 11, 10) ),
  new Course(2, 'Course2', 120, 'Best Course 2', false, new Date(2019, 2, 10) ),
  new Course(3, 'Course3', 260, 'Best Course 3', true, new Date(2018, 11, 26) )
];

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor() { }

  getList() {
    return courses;
  }

  createCourse(course: Course) {
    courses.push(course);
  }

  getItemById(id: any) {
    return this.getCourseById(id);
  }

  updateItem(course: Course) {
    // let courseToUpdate = getCourseById(course.id);
  }

  private getCourseById(id: any) {
    let index = id;
    if (typeof id === 'string') {
      index = Number(id);
    }
    return courses.find(c => c.id === index);
  }

  removeItem(course: Course) {
    let index;
    courses.forEach((c, i) => {
      if (c.id === course.id) {
        index = i;
      }
    });
    courses.splice(index, 1);
  }

}
