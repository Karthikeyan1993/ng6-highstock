import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TableContainerComponent implements OnInit {
  dataSet1: any[];
  dataSet2: any[];
  options: any;
  prop: string;
  sortOrder: string;

  constructor() {
    this.sortOrder = 'asc';
    this.dataSet1 = [
      { symbol: 'TATASTEEL', close: 579.80, date: '27-09-2108' },
      { symbol: 'LUPIN', close: 903.50, date: '26-09-2108' }
    ];
    this.dataSet2 = [];
  }

  ngOnInit() {
  }

  submit = (form) => {
    console.log(form.value);
  }

  sortData = (prop: string): void => {
    this.prop = prop;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.options = {
      'order': this.sortOrder,
      'prop': this.prop
    };
  }

  getChartClass = (prop) => {
    return {
      'fa-sort': this.prop !== prop,
      'fa-caret-up': this.prop === prop && this.sortOrder === 'desc',
      'fa-caret-down': this.prop === prop && this.sortOrder === 'asc'
    };
  }
}
