import { Directive, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { StockChartContainerComponent } from './stock-chart-container/stock-chart-container.component';


@Directive({
  selector: '[appStockChart]'
})
export class StockChartDirective implements OnChanges {

  @Input() highStockChartPeriod: string;
  highStockPeriodSubject: Subject<any> = new Subject<any>();
  comRef: ComponentRef<StockChartContainerComponent> = undefined;

  constructor(private _vcRef: ViewContainerRef, private _cfResolver: ComponentFactoryResolver) {
    this.syncProcess();
  }

  syncProcess = (): void => {
    this.highStockPeriodSubject.subscribe(e => {
      if (this.comRef) { this.hide(); }
      if (!this.comRef) {
        const cfResolver = this._cfResolver.resolveComponentFactory(StockChartContainerComponent);
        this.comRef = this._vcRef.createComponent(cfResolver);
        this.comRef.instance.period = this.highStockChartPeriod;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.highStockPeriodSubject.next(changes['highStockChartPeriod'].currentValue);
  }

  hide = (): void => {
    if (this.comRef) {
      this.comRef.destroy();
      this.comRef = undefined;
    }
  }

}
