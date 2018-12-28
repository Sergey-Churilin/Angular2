import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import {FilterPipe} from '../../../../pipes/index';
import {Course} from '../../course.model';
import {DataService} from '../../data-service.service';

@Component({
  selector: 'app-video-courses',
  templateUrl: './video-courses.component.html',
  styleUrls: ['./video-courses.component.css'],
  providers: [FilterPipe]
})
export class VideoCoursesComponent implements OnInit {
  public courses: Array<Course> = [];
  public filteredCourses: Array<Course> = [];

  constructor(private filterPipe: FilterPipe,
              private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe( event => {
      // this code is not performed during first component init
      if (event instanceof NavigationEnd) {
        this.getData();
      }
    });
    this.getData();
  }

  onEditCourse(course: Course) {
    const link = ['/courses/edit', course.id];
    this.router.navigate(link);
  }

  onDeleteCourse(course: Course) {
    const confirm = window.confirm('Do you really want to delete this course? ');
    if (confirm) {
      this.dataService.removeItem(course);
      this.getData();
    }
  }

  onLoadMore() {
    console.log('Load more');
  }

  onAddCourse() {
    const link = ['add'];
    this.router.navigate(link, {relativeTo: this.route});
  }

  onSearch(searchText) {
    this.filteredCourses = this.filterPipe.transform(this.courses, searchText);
  }

  private getData() {
    this.courses = this.dataService.getList();
    this.filteredCourses = this.courses.slice();
  }
}
