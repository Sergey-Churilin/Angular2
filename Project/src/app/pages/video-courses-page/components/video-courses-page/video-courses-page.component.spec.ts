import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCoursesPageComponent } from './video-courses-page.component';

describe('VideoCoursesPageComponent', () => {
  let component: VideoCoursesPageComponent;
  let fixture: ComponentFixture<VideoCoursesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCoursesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
