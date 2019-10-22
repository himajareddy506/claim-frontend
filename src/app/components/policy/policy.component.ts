import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataServiceService } from 'src/app/data-service.service';
// import { AlertService, AuthenticationService } from '../_services';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  policyForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  data1: any;
  err = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataServiceService,
    private route: Router,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.policyForm = this.formBuilder.group({
      policyId: ['', [
        Validators.required]]
    });

  }
  goto() {
    this.route.navigate(['/dashboard']);

  }
  // convenience getter for easy access to form fields
  get f() { return this.policyForm.controls; }

  onSubmit() {
    console.log("in submit")
    this.submitted = true;

    // stop here if form is invalid
    if (this.policyForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.policyForm);
    var policy = {
      "policyId": this.policyForm.value.policyId
    };
    // this.dataService.policyForm(policy).subscribe((response: any) => {
    this.http
      .post(environment.baseUrl + '/claimProcessing/api/v1/policy/?policyId=' + this.policyForm.value.policyId, policy)
      .subscribe((response: Response) => {
        console.log(response);
        if (response.statusCode == 200) {
          this.route.navigate(['/claim']);
        }
        else {
          alert(response['message']);
          this.route.navigate(['/policy']);
        }
        // alert(res['message'])
        // sessionStorage.setItem("customerId", res['customerId']);


      }, (err) => {
        this.err = true;
        console.log("rerror", err)
        alert(err.message);
      });

  }
}
