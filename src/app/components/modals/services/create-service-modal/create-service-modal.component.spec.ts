import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceModalComponent } from './create-service-modal.component';

describe('CreateServiceModalComponent', () => {
  let component: CreateServiceModalComponent;
  let fixture: ComponentFixture<CreateServiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
