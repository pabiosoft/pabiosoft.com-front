import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeProfilsComponent } from './resume-profils.component';

describe('ResumeProfilsComponent', () => {
  let component: ResumeProfilsComponent;
  let fixture: ComponentFixture<ResumeProfilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeProfilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
