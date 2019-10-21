import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { AccsummaryComponent } from '../accsummary/accsummary.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private router: Router,
    private route: Router,) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
