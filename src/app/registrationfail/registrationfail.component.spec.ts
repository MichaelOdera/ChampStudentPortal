import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationfailComponent } from './registrationfail.component';

describe('RegistrationfailComponent', () => {
  let component: RegistrationfailComponent;
  let fixture: ComponentFixture<RegistrationfailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationfailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationfailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
