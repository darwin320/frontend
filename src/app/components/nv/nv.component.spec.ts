import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvComponent } from './nv.component';

describe('NvComponent', () => {
  let component: NvComponent;
  let fixture: ComponentFixture<NvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
