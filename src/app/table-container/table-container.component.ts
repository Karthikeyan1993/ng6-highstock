import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
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
      { symbol: 'TATASTEEL', close: 579.80 },
      { symbol: 'LUPIN', close: 903.50 }
    ];
    this.dataSet2 = [];
  }

  ngOnInit() {
  }

  submit = (form) => {
    this.dataSet1.push({
      symbol: form.value.symbol.toUpperCase(),
      close: Number(form.value.close)
    });
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
      'fa-caret-up': this.prop === prop && this.sortOrder === 'asc',
      'fa-caret-down': this.prop === prop && this.sortOrder === 'desc'
    };
  }
}
