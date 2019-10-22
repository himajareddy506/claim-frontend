import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/**
 * The Register component
 */
export class RegisterComponent implements OnInit {
  details: boolean = true;

  /**
     * Formgrup intialize
     */
  claimForm: FormGroup;
  /**
     * loading status
     */
  loading = false;
  /**
     * submitted status
     */
  submitted = false;
  /**
     * response data object
     */
  data: any;
  /**
     * firstName intialize
     */
  firstName: string;
  /**
     * lastName intialize
     */
  lastName: string;

  emailId: string;
  natureOfAilment: string;
  diagnosis: string;
  detailsOfDischargeSummary: string;
  hospitalName: string;
  totalAmount: number;
  policyId: number;
  /**
     * The current time
     * @type {Date}
     */
  dischargeDate: Date;
  /**
     * The current time
     * @type {Date}
     */
  admitDate: Date;
  /**
     * The current time
     * @type {Date}
     */
  dob: Date;
  date: string;
  apibaseUrl: any;
  err = false;
  response = false;
  alertMsg: string = '';
  cities = [{ 'name': 'Respiratory', 'value': 'Respiratory' }, { 'name': 'Cardiac', 'value': 'Cardiac' }, { 'name': 'Orthopedic', 'value': 'Orthopedic' }];

  cities1: object;
  cities2 = [{ 'name': 'Apollo Hospitals', 'value': 'Apollo Hospitals' }, { 'name': 'Cloud Nine Hospitals', 'value': 'Cloud Nine Hospitals' }, { 'name': 'Fortis Hospitals', 'value': 'Fortis Hospitals' }, { 'name': 'Best Hospital', 'value': 'Best Hospital' }]
  settings: object = {
    columns: {
      firstName: {
        title: 'First Name'
      },
      lastName: {
        title: 'Last Name'
      },
      emailId: {
        title: 'Email Id'
      },
      claimId: {
        title: 'Claim Id'
      },
      policyNumber: {
        title: 'Policy Number'
      },

    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: "Approve",
          title: "Reject"
        }
      ]
    }
  };


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: Router,
    private http: HttpClient
  ) {
    this.cities1 = [];

  }

  ngOnInit() {
    this.claimForm = this.formBuilder.group({
      // Validations for form fields
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', Validators.required],
      policyId: ['', Validators.required],
      totalAmount: ['', Validators.required],
      natureOfAilment: ['', Validators.required],
      diagnosis: ['', Validators.required],
      hospitalName: ['', Validators.required],
      dischargeDate: ['', Validators.required],
      admitDate: ['', Validators.required],
      detailsOfDischargeSummary: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.claimForm.controls; }

  onSubmit() {
    this.submitted = true;
    // Replace all - with / in date field
    this.admitDate = this.replaceAll(this.claimForm.value.admitDate, '-', '/');
    this.dischargeDate = this.replaceAll(this.claimForm.value.dischargeDate, '-', '/');
    console.log(this.admitDate, this.dischargeDate);

    // this.date = new Date().toDateString();

    // stop here if form is invalid
    if (this.claimForm.invalid) {
      return;
    }
    // console.log(this.registerForm);
    /**
     * request Object to pass data to post call
     */
    var reqObj = {

      "policyId": this.claimForm.value.policyId,
      "natureOfAilment": this.claimForm.value.natureOfAilment.name,
      "diagnosis": this.claimForm.value.diagnosis,
      "hospitalName": this.claimForm.value.hospitalName,
      "detailsOfDischargeSummary": this.claimForm.value.detailsOfDischargeSummary,
      "totalAmount": this.claimForm.value.totalAmount,
      "mobileNumber": this.claimForm.value.mobileNumber,
      "dischargeDate": this.admitDate,
      "admitDate": this.dischargeDate
    };
    /**
     * Post call to return response
     */
    this.http.post(environment.baseUrl + '/claimProcessing/api/v1/claims/', reqObj).subscribe((response) => {
      if (response) {
        this.response = true;
        this.data = response;
        this.alertMsg = '';
        this.alertMsg = this.data.message;
        alert(response['message']);

        this.policyId = this.data.policyId;
        this.natureOfAilment = this.data.natureOfAilment;
        this.diagnosis = this.data.diagnosis;
        this.hospitalName = this.data.hospitalName;
        this.totalAmount = this.data.totalAmount;
        this.detailsOfDischargeSummary = this.data.detailsOfDischargeSummary;
        this.dischargeDate = this.data.dischargeDate;
        this.admitDate = this.data.admitDate;
        this.dob = this.data.dob;
        // Navigate to login page if form is submitted successfully
        if (response['message'] == 'Claim Info Already Exist') {
          this.route.navigate(['/policy']);
        } else {
          this.details = false;
        }
        // this.route.navigate(['/login']);


      }

      // console.log(this.registerForm);


    }, (err) => {
      // if form returns error
      this.err = true;
      console.log("rerror", err)
      alert(err.message);
    });

  }
  // For Date Field regular expression
  replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  // Dropdown for diagnosis and aliment
  onChange = (city) => {
    console.log(city);

    switch (city) {
      case 'Respiratory': //code block statement1;
        {
          this.cities1 = [{ 'name': 'Cold' }, { 'name': 'Cough' }, { 'name': 'Headache' }];
          break;
        }
      case 'Cardiac': //code block statement2;
        this.cities1 = [{ 'name': 'Heart valve Disease' }, { 'name': 'Heart Muscle Disease' }, { 'name': 'Others' }];
        break;
      case 'Orthopedic': //code block statement3;
        this.cities1 = [{ 'name': 'CTS' }, { 'name': 'Ligamentear' }, { 'name': 'Others' }];
        break;

    }

  }


}
