import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoCoursesComponent} from './videoCourses/video-courses/video-courses.component';

const routes: Routes = [
  { path: 'home', component: VideoCoursesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: VideoCoursesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
