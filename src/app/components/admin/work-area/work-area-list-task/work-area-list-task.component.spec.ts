import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAreaListTaskComponent } from './work-area-list-task.component';

describe('WorkAreaListTaskComponent', () => {
  let component: WorkAreaListTaskComponent;
  let fixture: ComponentFixture<WorkAreaListTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkAreaListTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkAreaListTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
