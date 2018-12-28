import { TestBed } from '@angular/core/testing';

import { CoursesIntercepterService } from './courses-intercepter.service';

describe('CoursesIntercepterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesIntercepterService = TestBed.get(CoursesIntercepterService);
    expect(service).toBeTruthy();
  });
});
