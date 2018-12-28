import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { SearchComponent,  CourseListComponent,  CourseListItemComponent,  BreadcrumbsComponent,  VideoCoursesComponent,
  AddCourseComponent,  DateComponent,  DurationComponent,  AuthorsComponent, VideoCoursesPageComponent} from './index';
import {DurationPipe, OrderByPipe, FilterPipe} from '../../pipes/index';
import {BorderDirective} from '../../directives/border.directive';
import {CoursesRoutingModule, coursesRouterComponents} from './courses-routing.module';
import {DataServicesModule} from './data-services.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoursesRoutingModule,
    DataServicesModule,
  ],
  declarations: [
    SearchComponent,
    CourseListComponent,
    CourseListItemComponent,
    BreadcrumbsComponent,
    /*VideoCoursesPageComponent,
    VideoCoursesComponent,
    AddCourseComponent,*/
    DateComponent,
    DurationComponent,
    AuthorsComponent,
    ...coursesRouterComponents,

    BorderDirective,

    DurationPipe,
    OrderByPipe,
    FilterPipe]
})
export class VideoCoursesModule {
}
