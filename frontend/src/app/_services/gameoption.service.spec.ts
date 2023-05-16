import { TestBed } from '@angular/core/testing';

import { GameoptionService } from './gameoption.service';

describe('GameoptionService', () => {
  let service: GameoptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameoptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
