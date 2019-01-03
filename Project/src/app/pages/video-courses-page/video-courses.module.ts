import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {coursesReducer} from '../../core/store/courses/courses.reducer';
import {authorsReducer} from '../../core/store/authors/authors.reducer';
import {CoursesEffects} from '../../core/store/courses';
import {AuthorsEffects} from '../../core/store/authors';
import { SearchComponent,  CourseListComponent,  CourseListItemComponent,  BreadcrumbsComponent,
  DateComponent,  DurationComponent,  AuthorsComponent, AuthorComponent} from './index';
import {DurationPipe, OrderByPipe, FilterPipe} from '../../pipes';
import {BorderDirective} from '../../directives/border.directive';
import {CoursesRoutingModule, coursesRouterComponents} from './courses-routing.module';
import {DataServicesModule} from './data-services.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    DataServicesModule,
    StoreModule.forFeature('courses', coursesReducer),
    StoreModule.forFeature('authors', authorsReducer),
    EffectsModule.forFeature([CoursesEffects, AuthorsEffects])
  ],
  declarations: [
    SearchComponent,
    CourseListComponent,
    CourseListItemComponent,
    BreadcrumbsComponent,
    DateComponent,
    DurationComponent,
    AuthorsComponent,
    AuthorComponent,
    ...coursesRouterComponents,

    BorderDirective,

    DurationPipe,
    OrderByPipe,
    FilterPipe]
})
export class VideoCoursesModule {
}
