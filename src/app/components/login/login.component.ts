import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataServiceService } from 'src/app/data-service.service';
/**
 * An interface for user intialization
 */
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
        this.loginForm = this.formBuilder.group({
            emailId: ['', [
                Validators.required,
                Validators.pattern("[^ @]*@[^ @]*")]],
            passCode: ['', [
                Validators.required,]],
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
        var login = {
            "emailId": this.loginForm.value.emailId,
            "passCode": this.loginForm.value.passCode
        };
        this.dataService.logFrom(login).subscribe((response: any) => {
            // this.http
            //     .post(environment.baseUrl + '/claimProcessing/api/v1/user/', this.loginForm.value)
            //     .subscribe((res: Response) => {
            console.log(response);
            // alert(res['message'])
            sessionStorage.setItem("userId", response['userId']);
            sessionStorage.setItem("roleId", response['roleId']);
            this.route.navigate(['/dashboard']);

        }, (err) => {
            this.err = true;
            console.log("rerror", err)
            alert(err.message);
        });

    }
}
