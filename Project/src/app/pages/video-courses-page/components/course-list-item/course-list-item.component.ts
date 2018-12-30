import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import {Course} from '../../course.model';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListItemComponent {
  @Input() course: Course;

  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>();

  onEditCourse() {
    this.edit.emit(this.course);
  }

  onDeleteCourse() {
    this.delete.emit(this.course);
  }

}
