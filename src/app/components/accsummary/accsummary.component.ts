import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  userId: number;
  claim_id: number;
  data: any[];
  display: boolean = false;
  settings: object = {
    columns: {
      claimNumber: {
        title: 'Claim #'
      },
      claimType: {
        title: 'Claim Type'
      },
      policyNumber: {
        title: 'Policy #'
      },
      claimedAmount: {
        title: 'Claimed Amount'
      },
      totalLimit: {
        title: 'Total Limit'
      },
      Reason: {
        title: 'Reason'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: "Approve",
          title: "Approve"
        },
        {
          name: "Reject",
          title: "Reject"
        }
      ]
    }
  };

  constructor(private router: Router,
    private route: Router,
    private http: HttpClient) { }

  ngOnInit() {

    this.userId = parseInt(sessionStorage.getItem("userId"));
    // this.http.get(environment.baseUrl + `/mortgage/api/customers/${this.customerId}`).subscribe((response) => {
    //   if (response) {
    //     this.data = response;
    //     return this.data;
    //     // console.log(response)
    //   }
    // });
  }

  paginate = (event) => {
    console.log(event);
    this.http.get(environment.baseUrl + '/claimProcessing/api/v1/?pageNumber=' + event.page + '&userId=' + this.userId).subscribe((response: any) => {
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
  approve() {

  }
  reject() {

  }
  showDialog() {
    this.display = true;

  }
}
