import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizcreationComponent } from './quizcreation.component';

describe('QuizcreationComponent', () => {
  let component: QuizcreationComponent;
  let fixture: ComponentFixture<QuizcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizcreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
