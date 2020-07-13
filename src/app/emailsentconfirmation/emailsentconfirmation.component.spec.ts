import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsentconfirmationComponent } from './emailsentconfirmation.component';

describe('EmailsentconfirmationComponent', () => {
  let component: EmailsentconfirmationComponent;
  let fixture: ComponentFixture<EmailsentconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsentconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsentconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
