import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  period = '1h';
  constructor() { }

  ngOnInit() {
  }

  changePeriod = (param) => {
    this.period = param;
  }

}
