import { Component, OnInit, Input } from '@angular/core';
import {Course} from '../course.model';
@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {
  @Input() course: Course;
  constructor() { }

  ngOnInit() {
    // this.course = new Course(1, 'Course1', 60, 'Best Course' );
  }

}
