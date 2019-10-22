import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from 'src/app/data-service.service';

interface Data2 {
  accountNumber: number;
  accountBalance: number;
  customerName: string;
  statusCode: number;
  message: string;
}
@Component({
  selector: 'app-accsummary',
  templateUrl: './accsummary.component.html',
  styleUrls: ['./accsummary.component.css']
})
export class AccsummaryComponent implements OnInit {
  claimId: any;
  userId: any;
  roleId: any;
  claim_id: number;
  data: any[];
  reqObj1: object;
  display: boolean = false;
  settings: object = {
    columns: {
      claimId: {
        title: 'Claim #'
      },
      juniorApproverClaimStatus: {
        title: 'Status'
      },
      policyId: {
        title: 'Policy #'
      },
      admitDate: {
        title: 'Admitted Date'
      },
      dischargeDate: {
        title: 'Discharged Date'
      },
      claimAmount: {
        title: 'Claimed Amount'
      },
      eligiblityAmount: {
        title: 'Total Limit'
      },
      detailsOfDischargeSummary: {
        title: 'Description'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: "Reason to Approve/Reject",
          title: "Reason to Approve/Reject &nbsp;"
        }
      ]
    }
  };
  reasonForm: FormGroup;
  submitted = false;
  loading = false;
  claimStatus: any;
  // formBuilder: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: Router,
    private dataService: DataServiceService,
    private http: HttpClient) {
    this.claimStatus = [
      { name: 'Rejected', code: 'Rejected' },
      { name: 'Approved', code: 'Approved' }
    ];
  }

  ngOnInit() {

    this.userId = parseInt(sessionStorage.getItem("userId"));
    this.roleId = parseInt(sessionStorage.getItem("roleId"));
    // this.quantityForm = this.formBuilder.group({
    //   quantity: ['', Validators.required]
    // });
    this.reasonForm = this.formBuilder.group({
      reason: ['', Validators.required],
      claimStatus: ['', Validators.required]
    });

  }

  paginate = (event) => {
    console.log(event);
    this.dataService.getNews(event.page, this.roleId).subscribe((response: any) => {
      if (response) {
        this.data = response;
        console.log(response);
        // return this.data;
        // console.log(response)
        this.data = response;
        localStorage.setItem("claimId", response['claimId']);
        console.log(response);
      }
    });

  }

  rowClicked = (event: Event) => {
    this.claimId = localStorage.getItem("claimId");
    this.claim_id = Number(localStorage.getItem("claimId"));
    console.log(event)
    this.display = true;
    // this.selectedStock = event.data.stockName;
    console.log(event, 'cdscd');
    const d = confirm();
    if (d == true) {
      this.approve();
      this.showDialog();
    } else {
      alert('false');
      this.showDialog();
    }
  }
  approve = () => {

  }
  reject = () => {

  }
  showDialog = () => {
    this.display = true;

  }
  cancel = () => {
    // this.cancelEvent.emit();
    this.display = false;
    this.route.navigate(['/dashboard']);
  }

  //Form to change approve/Reject Status

  get f() { return this.reasonForm.controls; }

  confirm() {
    // this.display = false;
    // this.confirmEvent.emit();
    console.log("in submit")
    this.submitted = true;

    // stop here if form is invalid
    if (this.reasonForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.reasonForm.value.reason.name);
    this.reqObj1 = {
      "reason": this.reasonForm.value.reason.name.reason,
      "roleId": Number(sessionStorage.getItem("roleId")),
      "claimId": Number(sessionStorage.getItem("claimId")),
      "claimStatus": this.reasonForm.value.reason.name.claimStatus
    };
    this.dataService.respForm(this.reqObj1).subscribe((res: any) => {
      // this.http.post(environment.baseUrl + 'claimProcessing/api/v1/', this.reqObj1)
      // .subscribe((res: Response) => {
      console.log(res);
      this.route.navigate(['/dashboard']);

    }, (err) => {
      console.log(err)
      alert(err.message);
    });
    // this.route.navigate(['/Dashboard']);
  }
}
