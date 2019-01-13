import {OnInit, Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from 'rxjs/internal/Subscription';

import {Course} from '../../course.model';
import {DataService} from '../../data-service.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})

export class CourseListComponent implements OnInit, OnDestroy {
  @Input() courses: Array<Course>;

  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>();

  private editedCourse: Course;
  private paramMapSub: Subscription;
  private courseDataSub: Subscription;

  constructor(private router: Router,
              private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramMapSub = this.route.paramMap
      .subscribe(params => {
        if (+params.get('editedCourseId')) {
          this.courseDataSub = this.dataService.getItemById(+params.get('editedCourseId'))
            .subscribe(course => {
              if (course) {
                this.editedCourse = course;
              }
            });
        }
      });
  }

  ngOnDestroy() {
    this.paramMapSub.unsubscribe();
    if (this.courseDataSub) {
      this.courseDataSub.unsubscribe();
    }
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
