import { OnInit,  Component, Input, Output, EventEmitter } from '@angular/core';

import {Course} from '../../course.model';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../data-service.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit {
  @Input() courses: Array<Course>;

  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>();

  private editedCourse: Course;

  constructor(private router: Router,
              private courseDataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
    // TODO fix that pipe
    // .pipe(
    //   switchMap((params: Params) =>
    //     this.courseDataService.getItemById(+params.get('id'))
    //   )
    // )
    // .subscribe(course => this.course = {...course}, err => console.log(err));

      .subscribe(params => {
        const course = this.courseDataService.getItemById(+params.get('editedCourseId'));
        if (course) {
          this.editedCourse = course;
        }
      });
    console.log('ngOnInit');
  }

  onEditCourse(course: Course) {
    this.edit.emit(course);
  }

  onDeleteCourse(course: Course) {
    this.delete.emit(course);
  }

  isEditedCourse(course: Course): boolean {
    if (course && this.editedCourse) {
      return this.editedCourse.id === course.id;
    }

    return false;
  }
}
