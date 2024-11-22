import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAreaPostTaskComponent } from './work-area-post-task.component';

describe('WorkAreaPostTaskComponent', () => {
  let component: WorkAreaPostTaskComponent;
  let fixture: ComponentFixture<WorkAreaPostTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkAreaPostTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkAreaPostTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
