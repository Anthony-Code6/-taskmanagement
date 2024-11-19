import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateWorkComponent } from './create-update-work.component';

describe('CreateUpdateWorkComponent', () => {
  let component: CreateUpdateWorkComponent;
  let fixture: ComponentFixture<CreateUpdateWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
