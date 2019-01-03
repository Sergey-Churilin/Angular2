import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';

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
    authors: []
  };
  show: boolean = false;
  breadCrumbsTitle: string;

  courseForm: FormGroup;

  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private courseDataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    // prepare form
    this.courseForm = new FormGroup({
      title: new FormControl(this.course.title, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(this.course.description, [Validators.required, Validators.maxLength(500)]),
      creationDate: new FormControl(this.course.creationDate, [Validators.required]),
      duration: new FormControl(this.course.duration, [Validators.required]),
      authors: new FormControl(this.course.authors,  [Validators.required])
    });

    // fill form in edit mode
    this.sub = this.store.pipe(select(getSelectedCourse))
      .subscribe(course => {
        if (course) {
          this.course = course;
          this.courseForm.patchValue({
            title: this.course.title,
            description: this.course.description,
            creationDate: this.course.creationDate,
            duration: this.course.duration,
            authors: this.course.authors
        });

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
    this.matchCourseValues();
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

  hasError(c: FormControl) {
    if (c.touched && c.errors) {
      return true;
    }
  }

  private matchCourseValues() {
    Object.keys(this.courseForm.value).forEach(k => {
        this.course[k] = this.courseForm.value[k];
    });
  }
}
