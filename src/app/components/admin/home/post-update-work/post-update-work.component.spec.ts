import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUpdateWorkComponent } from './post-update-work.component';

describe('PostUpdateWorkComponent', () => {
  let component: PostUpdateWorkComponent;
  let fixture: ComponentFixture<PostUpdateWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostUpdateWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostUpdateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
