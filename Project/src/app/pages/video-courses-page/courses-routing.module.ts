import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {VideoCoursesComponent, AddCourseComponent, VideoCoursesPageComponent} from './index';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: 'courses',
    component: VideoCoursesPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add',
        component: AddCourseComponent
      },
      {
        path: 'edit/:id',
        component: AddCourseComponent
      },
      {
        path: '',
        component: VideoCoursesComponent
      }
    ]}
];

export const coursesRouterComponents = [
  VideoCoursesPageComponent,
  VideoCoursesComponent,
  AddCourseComponent
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CoursesRoutingModule { }
