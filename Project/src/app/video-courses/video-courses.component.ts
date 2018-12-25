import { Component, OnInit } from '@angular/core';

import {Course} from '../course.model';

@Component({
  selector: 'app-video-courses',
  templateUrl: './video-courses.component.html',
  styleUrls: ['./video-courses.component.css']
})
export class VideoCoursesComponent implements OnInit {
  public courses: Array<Course>;
  constructor() { }

  ngOnInit() {
    this.courses = [ new Course(1, 'Course1', 60, 'Best Course' ) ];
  }

  onDeleteTask(course: Course) {
    console.log(course.id);
  }

  onLoadMore() {
    console.log('Load more');
  }
}
