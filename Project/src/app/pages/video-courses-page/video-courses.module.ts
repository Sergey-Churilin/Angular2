import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {coursesReducer} from '../../core/store/courses/courses.reducer';
import { SearchComponent,  CourseListComponent,  CourseListItemComponent,  BreadcrumbsComponent,
  DateComponent,  DurationComponent,  AuthorsComponent} from './index';
import {DurationPipe, OrderByPipe, FilterPipe} from '../../pipes';
import {BorderDirective} from '../../directives/border.directive';
import {CoursesRoutingModule, coursesRouterComponents} from './courses-routing.module';
import {DataServicesModule} from './data-services.module';
import {CoursesEffects} from '../../core/store/courses';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoursesRoutingModule,
    DataServicesModule,
    StoreModule.forFeature('courses', coursesReducer),
    EffectsModule.forFeature([CoursesEffects])
  ],
  declarations: [
    SearchComponent,
    CourseListComponent,
    CourseListItemComponent,
    BreadcrumbsComponent,
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
