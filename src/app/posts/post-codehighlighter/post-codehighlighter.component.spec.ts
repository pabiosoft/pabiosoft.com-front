import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCodehighlighterComponent } from './post-codehighlighter.component';

describe('PostCodehighlighterComponent', () => {
  let component: PostCodehighlighterComponent;
  let fixture: ComponentFixture<PostCodehighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCodehighlighterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCodehighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
