import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular2-highstock';
import { AppComponent } from './app.component';
import { TableSortPipe } from './table-sort.pipe';
import { TableContainerComponent } from './table-container/table-container.component';
import { StockChartDirective } from './stock-chart.directive';
import { StockChartContainerComponent } from './stock-chart-container/stock-chart-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TableSortPipe,
    TableContainerComponent,
    StockChartDirective,
    StockChartContainerComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  entryComponents: [StockChartContainerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
