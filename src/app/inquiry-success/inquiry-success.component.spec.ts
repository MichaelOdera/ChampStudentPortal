import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquirySuccessComponent } from './inquiry-success.component';

describe('InquirySuccessComponent', () => {
  let component: InquirySuccessComponent;
  let fixture: ComponentFixture<InquirySuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquirySuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquirySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
