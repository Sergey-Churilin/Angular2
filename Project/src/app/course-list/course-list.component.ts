import { Component, OnInit } from '@angular/core';
import {CourseListItemComponent} from '../course-list-item/course-list-item.component';
import {Course} from '../course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  public courses: Array<Course>;
  constructor() { }

  ngOnInit() {
    this.courses = [ new Course(1, 'Course1', 60, 'Best Course' ) ];
  }

}
