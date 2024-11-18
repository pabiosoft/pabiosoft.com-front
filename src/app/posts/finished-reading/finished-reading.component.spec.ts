import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedReadingComponent } from './finished-reading.component';

describe('FinishedReadingComponent', () => {
  let component: FinishedReadingComponent;
  let fixture: ComponentFixture<FinishedReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
