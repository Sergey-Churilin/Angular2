import { Component, OnInit } from '@angular/core';
import {Course} from '../course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  public course: Partial<Course> = {
    title: '',
    description: '',
    creationDate: null,
    duration: null,
    authors: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    console.log('onSave');
  }

  onCancel() {
    console.log('onCancel');
  }

}
