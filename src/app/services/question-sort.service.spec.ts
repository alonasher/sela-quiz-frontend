import { TestBed } from '@angular/core/testing';

import { QuestionSortService } from './question-sort.service';

describe('QuestionSortService', () => {
  let service: QuestionSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
