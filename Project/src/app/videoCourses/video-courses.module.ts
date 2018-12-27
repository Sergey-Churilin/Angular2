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

    BorderDirective,

    DurationPipe,
    OrderByPipe,
    FilterPipe]
})
export class VideoCoursesModule {
}
