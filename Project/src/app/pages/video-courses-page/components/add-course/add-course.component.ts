import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Store, select} from '@ngrx/store';

// rxjs
import {Subscription} from 'rxjs';

import {AppState, getSelectedCourse} from '../../../../core/store';
import * as CoursesActions from '../../../../core/store/courses/courses.actions';
import {Course} from '../../course.model';
import {DataService} from '../../data-service.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, OnDestroy {
  course: Partial<Course> = {
    id: null,
    title: '',
    description: '',
    creationDate: null,
    duration: null,
    authors: ''
  };
  show: boolean = false;
  breadCrumbsTitle: string;
  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private courseDataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    this.sub = this.store.pipe(select(getSelectedCourse))
      .subscribe(course => {
        if (course) {
          (<Course>course).creationDate = new Date(course.creationDate);
          this.course = course;
          this.show = true;
          this.breadCrumbsTitle = course.title;
        }
      });

    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.store.dispatch(new CoursesActions.GetCourse(+id));
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSave() {
    if (this.course.id) {
      this.store.dispatch(new CoursesActions.UpdateCourse(this.course as Course));
    } else {
      this.course.id = +(Math.random() * 10000).toFixed();
      this.store.dispatch(new CoursesActions.CreateCourse(<Course>this.course));
    }
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
