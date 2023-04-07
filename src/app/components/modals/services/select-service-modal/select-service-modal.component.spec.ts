import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectServiceModalComponent } from './select-service-modal.component';

describe('SelectServiceModalComponent', () => {
  let component: SelectServiceModalComponent;
  let fixture: ComponentFixture<SelectServiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectServiceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
