import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutReservationModalComponent } from './check-out-reservation-modal.component';

describe('CheckOutReservationModalComponent', () => {
  let component: CheckOutReservationModalComponent;
  let fixture: ComponentFixture<CheckOutReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutReservationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
