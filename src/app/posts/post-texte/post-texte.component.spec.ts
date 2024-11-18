import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTexteComponent } from './post-texte.component';

describe('PostTexteComponent', () => {
  let component: PostTexteComponent;
  let fixture: ComponentFixture<PostTexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostTexteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
