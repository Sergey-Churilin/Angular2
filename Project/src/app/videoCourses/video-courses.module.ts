import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SearchComponent} from './search/search.component';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseListItemComponent} from './course-list-item/course-list-item.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {VideoCoursesComponent} from './video-courses/video-courses.component';
import {DurationPipe, OrderByPipe, FilterPipe} from '../pipes';
import {BorderDirective} from '../directives/border.directive';
import {AddCourseComponent} from './add-course/add-course.component';
import {DateComponent} from './date/date.component';
import {DurationComponent} from './duration/duration.component';
import {AuthorsComponent} from './authors/authors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchComponent,
    CourseListComponent,
    CourseListItemComponent,
    BreadcrumbsComponent,
    VideoCoursesComponent,
    AddCourseComponent,
    DateComponent,
    DurationComponent,
    AuthorsComponent,

    BorderDirective,

    DurationPipe,
    OrderByPipe,
    FilterPipe]
})
export class VideoCoursesModule {
}
