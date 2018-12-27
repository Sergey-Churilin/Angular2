import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoCoursesComponent} from './videoCourses/video-courses/video-courses.component';
import {LoginComponent} from './login/login.component';
import {AddCourseComponent} from './videoCourses/add-course/add-course.component';

const routes: Routes = [
  { path: 'home', component: VideoCoursesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddCourseComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: VideoCoursesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
