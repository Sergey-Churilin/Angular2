import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {CourseListItemComponent} from './course-list-item.component';
import {Course} from '../course.model';

@Component({
  template: `
    <app-course-list-item
      *ngFor="let course of courses"
      [course]="course"
      (delete)="onDeleteCourse($event)">
    </app-course-list-item>`
})

class TestCourseListComponent {
  public courses: Array<Course> = [{
    id: 1, title: 'Course1', duration: 50, description: 'Description', topRated: false,
    creationDate: new Date(2011, 0, 1, 2, 3, 4, 567)
  }];
  public deletedItem: Course;

  public onDeleteCourse(course: Course) {
    this.deletedItem = course;
  }
}

describe('CourseListItemComponent', () => {
  let component: TestCourseListComponent;
  let fixture: ComponentFixture<TestCourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListItemComponent, TestCourseListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCourseListComponent);
    component = fixture.componentInstance;
  });

  it('should raise deleted item', () => {
    fixture.detectChanges();

    const expectedDeletedItem = {
      id: 1, title: 'Course1', duration: 50, description: 'Description', topRated: false,
      creationDate: new Date(2011, 0, 1, 2, 3, 4, 567)
    };
    const btnDelete = fixture.debugElement.query(By.css('.btn-danger'));
    btnDelete.triggerEventHandler('click', null);
    expect(component.deletedItem).toEqual(expectedDeletedItem);
  });
});

// class test approach
describe('CourseListItemComponent', () => {

  it('raises the deleted event when clicked', () => {

    const component: CourseListItemComponent = new CourseListItemComponent();
    const course: Course = {
      id: 1, title: 'Course1', duration: 50, description: 'Description', topRated: false,
      creationDate: new Date(2011, 0, 1, 2, 3, 4, 567)
    };
    component.course = course;

    component.delete.subscribe(deletedCourse => expect(deletedCourse).toBe(course));
    component.onDeleteCourse();
  });
});
