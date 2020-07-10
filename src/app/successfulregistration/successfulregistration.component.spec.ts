import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulregistrationComponent } from './successfulregistration.component';

describe('SuccessfulregistrationComponent', () => {
  let component: SuccessfulregistrationComponent;
  let fixture: ComponentFixture<SuccessfulregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
