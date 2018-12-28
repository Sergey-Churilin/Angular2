import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, ParamMap, Router} from '@angular/router';
import {ObservableInput} from "rxjs/internal/types";
import {switchMap} from 'rxjs/operators';

import {Course} from '../../course.model';
import {DataService} from '../../data-service.service';

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
  public show: boolean = false;
  public breadCrumbsTitle: string;

  constructor(private route: ActivatedRoute,
              private courseDataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap
      // TODO fix that pipe
      // .pipe(
      //   switchMap((params: Params) =>
      //     this.courseDataService.getItemById(+params.get('id'))
      //   )
      // )
      // .subscribe(course => this.course = {...course}, err => console.log(err));

      .subscribe(params => {
        const course = this.courseDataService.getItemById(+params.get('id'));
        if (course) {
          this.course = course;
          this.show = true;
          this.breadCrumbsTitle = course.title;
        }
      });
  }

  onSave() {
    this.courseDataService.updateItem(this.course as Course);
    this.router.navigate(['/courses', {editedCourseId: this.course.id}]);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }

}
