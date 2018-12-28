import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import {Course} from '../../course.model';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListItemComponent implements OnInit {
  @Input() course: Course;

  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>();

  ngOnInit() {console.log(this.course.creationDate); }

  onEditCourse() {
    this.edit.emit(this.course);
  }

  onDeleteCourse() {
    this.delete.emit(this.course);
  }

}
