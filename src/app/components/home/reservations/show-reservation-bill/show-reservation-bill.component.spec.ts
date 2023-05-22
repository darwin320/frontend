import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReservationBillComponent } from './show-reservation-bill.component';

describe('ShowReservationBillComponent', () => {
  let component: ShowReservationBillComponent;
  let fixture: ComponentFixture<ShowReservationBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReservationBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowReservationBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
