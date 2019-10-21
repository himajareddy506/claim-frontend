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
export class RegisterComponent implements OnInit {
  claimForm: FormGroup;
  loading = false;
  submitted = false;
  data: any;
  firstName: string;
  lastName: string;
  emailId: string;
  natureOfAilment: string;
  diagnosis: string;
  detailsOfDischargeSummary: string;
  hospitalName: string;
  totalAmount: number;
  policyNumber: number;
  dischargeDate: Date;
  admitDate: Date;
  dob: Date;
  date: string;
  apibaseUrl: any;
  err = false;
  response = false;
  alertMsg: string = '';
  cities = [{ 'name': 'Respiratory', 'value': 1 }, { 'name': 'Cardiac', 'value': 2 }, { 'name': 'Orthopedic', 'value': 3 }];

  cities1: object;
  cities2 = [{ 'name': 'NRI' }, { 'name': 'Aswini Hospitals' }, { 'name': 'Yamini Hospitals' }]



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.claimForm = this.formBuilder.group({
      // Validations for form fields
      firstName: ['', [Validators.required, Validators.maxLength(6)]],
      lastName: ['', [Validators.required, Validators.maxLength(6)]],
      emailId: ['', Validators.required, Validators.maxLength(6)],
      policyNumber: ['', Validators.required, Validators.maxLength(6)],
      totalAmount: ['', Validators.required],
      natureOfAilment: ['', Validators.required],
      diagnosis: ['', Validators.required],
      hospitalName: ['', Validators.required],
      dischargeDate: ['', Validators.required],
      admitDate: ['', Validators.required],
      detailsOfDischargeSummary: ['', Validators.required, Validators.maxLength(1000)],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      dob: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.claimForm.controls; }

  onSubmit() {
    this.submitted = true;
    // Replace all - with / in date field
    this.date = this.replaceAll(this.claimForm.value.dob, '-', '/');
    // console.log(this.date);
    // this.date = new Date().toDateString();

    // stop here if form is invalid
    if (this.claimForm.invalid) {
      return;
    }
    // console.log(this.registerForm);
    var reqObj = {
      "fisrtName": this.claimForm.value.firstName,
      "lastName": this.claimForm.value.lastName,
      "emailId": this.claimForm.value.emailId,
      "policyNumber": this.claimForm.value.policyNumber,
      "natureOfAilment": this.claimForm.value.natureOfAilment,
      "diagnosis": this.claimForm.value.diagnosis,
      "hospitalName": this.claimForm.value.hospitalName,
      "detailsOfDischargeSummary": this.claimForm.value.detailsOfDischargeSummary,
      "totalAmount": this.claimForm.value.totalAmount,
      "mobileNumber": this.claimForm.value.mobileNumber,
      "dischargeDate": this.date,
      "admitDate": this.date,
      "dob": this.date
    };
    this.http.post(environment.baseUrl + '/mortgage/api/register', reqObj).subscribe((response) => {
      if (response) {
        this.response = true;
        this.data = response;
        this.alertMsg = '';
        this.alertMsg = this.data.message;
        alert(response['message']);
        this.firstName = this.data.firstName;
        this.lastName = this.data.lastName;
        this.emailId = this.data.emailId;
        this.policyNumber = this.data.policyNumber;
        this.natureOfAilment = this.data.natureOfAilment;
        this.diagnosis = this.data.diagnosis;
        this.hospitalName = this.data.hospitalName;
        this.totalAmount = this.data.totalAmount;
        this.detailsOfDischargeSummary = this.data.detailsOfDischargeSummary;
        this.dischargeDate = this.data.dischargeDate;
        this.admitDate = this.data.admitDate;
        this.dob = this.data.dob;
        // Navigate to login page if form is submitted successfully
        this.route.navigate(['/login']);
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
    this.cities1 = [];
    console.log(city);

    if (city == 1) {
      this.cities1 = [{ 'name': 'Cold' }, { 'name': 'Cough' }, { 'name': 'Headache' }];
    } else if (city == 2) {
      this.cities1 = [{ 'name': 'Heart valve Disease' }, { 'name': 'Heart Muscle Disease' }, { 'name': 'Others' }];

    }
    else {
      this.cities1 = [{ 'name': 'CTS' }, { 'name': 'Ligamentear' }, { 'name': 'Others' }];
    }


  }


}
