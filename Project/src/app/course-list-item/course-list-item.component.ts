import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Course} from '../course.model';
@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {
  @Input() course: Course;

  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>();

  ngOnInit() {}

  onDeleteCourse() {
    this.delete.emit(this.course);
  }

}
