import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMediaComponent } from './post-media.component';

describe('PostMediaComponent', () => {
  let component: PostMediaComponent;
  let fixture: ComponentFixture<PostMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
