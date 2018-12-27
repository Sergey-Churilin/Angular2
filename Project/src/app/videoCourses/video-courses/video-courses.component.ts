import { Component, OnInit } from '@angular/core';

import {FilterPipe} from '../../pipes';
import {Course} from '../course.model';
import {DataService} from '../data-service.service';

@Component({
  selector: 'app-video-courses',
  templateUrl: './video-courses.component.html',
  styleUrls: ['./video-courses.component.css'],
  providers: [FilterPipe]
})
export class VideoCoursesComponent implements OnInit {
  private courses: Array<Course> = [];
  public filteredCourses: Array<Course> = [];

  constructor(private filterPipe: FilterPipe, private dataService: DataService) { }

  ngOnInit() {
    this.courses = this.dataService.getList();
    this.filteredCourses = this.courses.slice();
  }

  onDeleteTask(course: Course) {
    console.log(course.id);
  }

  onLoadMore() {
    console.log('Load more');
  }

  onSearch(searchText) {
    this.filteredCourses = this.filterPipe.transform(this.courses, searchText);
  }
}
