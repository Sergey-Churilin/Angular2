import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Store, select} from '@ngrx/store';


import {AppState} from '../../../../core/store';
import * as CoursesActions from '../../../../core/store/courses/courses.actions';
import {FilterPipe} from '../../../../pipes';
import {Course} from '../../course.model';
import {DataService} from '../../data-service.service';

@Component({
  selector: 'app-video-courses',
  templateUrl: './video-courses.component.html',
  styleUrls: ['./video-courses.component.css'],
  providers: [FilterPipe]
})
export class VideoCoursesComponent implements OnInit {
  courses: Array<Course> = [];
  filteredCourses: Array<Course> = [];

  constructor(private store: Store<AppState>,
              private filterPipe: FilterPipe,
              private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.pipe(select('courses'))
      .subscribe((courses) => {
        this.courses = courses.data.map(c => {c.creationDate = new Date(c.creationDate); return c; });
        this.filteredCourses = this.courses.slice();
      });

    this.router.events.subscribe( event => {
      // this code is not performed during first component init
      if (event instanceof NavigationEnd && event.url === '/courses') {
        this.getData();
      }
    });
    this.getData();
  }

  onAddCourse() {
    const link = ['add'];
    this.router.navigate(link, {relativeTo: this.route});
  }

  onEditCourse(course: Course) {
    const link = ['/courses/edit', course.id];
    this.router.navigate(link);
  }

  onDeleteCourse(course: Course) {
    const confirm = window.confirm('Do you really want to delete this course? ');
    if (confirm) {
      this.store.dispatch(new CoursesActions.DeleteCourse(course));
    }
  }

  onLoadMore() {
    this.store.dispatch(new CoursesActions.GetCoursesMore());
  }

  onSearch(searchText) {
    // this.filteredCourses = this.filterPipe.transform(this.courses, searchText);

    this.dataService.search(searchText)
      .then((courses) => {
        this.courses = courses.map(c => {c.creationDate = new Date(c.creationDate); return c; });
        this.filteredCourses = this.courses.slice();
      });
  }

  private getData() {
    this.store.dispatch(new CoursesActions.GetCourses());
  }
}
