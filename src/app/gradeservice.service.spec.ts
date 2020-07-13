import { TestBed } from '@angular/core/testing';

import { GradeserviceService } from './gradeservice.service';

describe('GradeserviceService', () => {
  let service: GradeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
