import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { AlertService, AuthenticationService } from '../_services';

export class User {
  constructor(public emailId: string,
    public password: string) {
  }
}

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    accountNumber: any;
    returnUrl: string;
    data1: any;
    loginId: any;
    password: any;
    err=false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: Router,
        private http: HttpClient
    ) {
       
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            emailId: ['', [
              Validators.required,
              Validators.pattern("[^ @]*@[^ @]*")]],
            password: ['', [
              Validators.required,
              Validators.minLength(8)]],
        });

    }
    goto() {
        this.route.navigate(['/dashboard']);

    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        console.log("in submit")
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        console.log(this.loginForm);
        var reqObj1 = {
            "emailId": this.loginForm.value.emailId,
            "password": this.loginForm.value.password
        };

        this.http
            .post(environment.baseUrl + '/mortgage/api/login', this.loginForm.value)
            .subscribe((res: Response) => {
                console.log(res);
                // alert(res['message'])
                sessionStorage.setItem("customerId", res['customerId']);
                this.route.navigate(['/dashboard']);

            }, (err) => {
                this.err=true;
                console.log("rerror",err)
                alert(err.message);
            });

    }
}
