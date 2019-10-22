import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('Component: Register', () => {

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [RegisterComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(RegisterComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('claimForm invalid when empty', () => {
    expect(component.claimForm.valid).toBeFalsy();
  });

  it('emailId field validity', () => {
    let errors = {};
    let emailId = component.claimForm.controls['emailId'];
    expect(emailId.valid).toBeFalsy();

    // Email field is required
    errors = emailId.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    emailId.setValue("test");
    errors = emailId.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    emailId.setValue("test@example.com");
    errors = emailId.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('submitting a claimForm return message', () => {
    expect(component.claimForm.invalid).toBeFalsy();
    component.claimForm.controls['firstName'].setValue("test");
    component.claimForm.controls['lastName'].setValue("test");
    component.claimForm.controls['emailId'].setValue("test@test.com");
    component.claimForm.controls['policyNumber'].setValue("SR1234");
    component.claimForm.controls['natureOfAilment'].setValue("test");
    component.claimForm.controls['diagnosis'].setValue("test");
    component.claimForm.controls['hospitalName'].setValue("test");
    component.claimForm.controls['detailsOfDischargeSummary'].setValue("Sample text");
    component.claimForm.controls['totalAmount'].setValue("12345");
    component.claimForm.controls['mobileNumber'].setValue("9876543321");
    component.claimForm.controls['dischargeDate'].setValue("1994/06/10");
    component.claimForm.controls['admitDate'].setValue("1994/06/10");
    component.claimForm.controls['dob'].setValue("1993/06/13");
    expect(component.claimForm.valid).toBeTruthy();

  });
  it('should create new object', () => {
    // @ts-ignore
    const comp = new RegisterComponent();
    comp.ngOnInit();
    expect(comp).toBeTruthy();
  });
});
