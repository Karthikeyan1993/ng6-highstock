import { Component, OnInit } from '@angular/core';
import { Util } from '../util';
import { CommonService } from '../common.service';
const HighchartsCore = require('highcharts/highstock.src');
HighchartsCore.setOptions({
  lang: {
    rangeSelectorZoom: ''
  }, global: { useUTC: false }
});
@Component({
  selector: 'app-stock-chart-container',
  templateUrl: './stock-chart-container.component.html',
  styleUrls: ['./stock-chart-container.component.css']
})
export class StockChartContainerComponent implements OnInit {
  period;
  data = [];
  options: any;
  constructor(private _commonService: CommonService) {
  }

  ngOnInit() {
    if (this.period === '1h' || this.period === '1d') {
      this._commonService.getIntraDayData().subscribe(res => {
        const _result = Util.formatJsonData(res);
        this.data = this.getPeriodData(this.period, _result);
        this.chartConfiguration();
      }, (err) => {
        console.error(err);
      });
    } else {
      this._commonService.getYearlyData().subscribe(res => {
        const _result = Util.formatJsonData(res);
        this.data = this.getPeriodData(this.period, _result);
        this.chartConfiguration();
      }, (err) => {
        console.error(err);
      });
    }
  }

  chartConfiguration = () => {
    this.options = {
      rangeSelector: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      scrollbar: {
        enabled: false
      },
      xAxis: {
        minRange: 3600 * 1000
      },
      series: [{
        type: 'area',
        color: 'rgb(15, 131, 201)',
        data: this.data,
        tooltip: {
          valueDecimals: 2
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'rgb(15, 131, 201)'],
            [1, 'rgba(15, 131, 201, 0.1)']
          ]
        },
        threshold: null,
        dataGrouping: {
          enabled: false
        }
      }]
    };
  }

  getPeriodData = (period: string, data: any[]) => {
    const _count = Number(period.substring(0, 1));
    const _type = period.substring(1, 2);
    const _maxVal = data[data.length - 1][0];
    let _minVal, _dummy = [];
    if (_type === 'h') {
      _minVal = _maxVal - (3600 * 1000 * _count);
    } else if (_type === 'd') {
      _minVal = _maxVal - (24 * 3600 * 1000 * _count);
    } else if (_type === 'w') {
      _minVal = _maxVal - (7 * 24 * 3600 * 1000 * _count);
    } else if (_type === 'm') {
      _minVal = _maxVal - (30 * 24 * 3600 * 1000 * _count);
    } else if (_type === 'y') {
      _minVal = _maxVal - (365 * 24 * 3600 * 1000 * _count);
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] >= _minVal) {
        _dummy = data.slice(i, data.length - 1);
        break;
      }
    }
    return _dummy;
  }
}
