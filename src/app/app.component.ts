import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
  dataSet1: any[] = [{ name: 'karthik' }, { name: 'arun' }, { name: 'john' }];
  dataSet2: any[] = ['karthik', 'arun', 'john'];
  title = 'highChartApp';
  sortOrder = 'asc';
  prop: string;
  options: any;
  sortData = () => {
    this.prop = 'name';
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.options = {
      'prop': this.prop,
      'order': this.sortOrder
    };
  }
}
