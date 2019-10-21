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
  customerId: any;
  data2: any = '';

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
      edit: true,
      delete: true,
      position: 'right',
      custom: [
        {
          name: "Approve",
          title: "Reject"
        }
      ]
    }
  };

  constructor(private router: Router,
    private route: Router,
    private http: HttpClient) { }

  ngOnInit() {

    this.customerId = sessionStorage.getItem("customerId");
    this.http.get(environment.baseUrl + `/mortgage/api/customers/${this.customerId}`).subscribe((response) => {
      if (response) {
        this.data2 = response;
        return this.data2;
        // console.log(response)
      }
    });
  }

}
