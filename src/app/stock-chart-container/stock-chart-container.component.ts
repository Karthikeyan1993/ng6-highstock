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

  getPeriodData = (period, json: any[]) => {
    let _dummy = [];
    if (period === '1h') {
      const _max = json[json.length - 1][0];
      const _min = _max - (3600 * 1000);
      let _minIndex = -1;
      const _lastIndex = json.length - 1;
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        if (element[0] >= _min) {
          _minIndex = index;
          break;
        }
      }
      _dummy = json.slice(_minIndex, _lastIndex);
    } else if (period === '1d') {
      _dummy = json;
    } else if (period === '1y') {
      const _max = json[json.length - 1][0];
      const _min = _max - (365 * 24 * 3600 * 1000);
      let _minIndex = -1;
      const _lastIndex = json.length - 1;
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        if (element[0] >= _min) {
          _minIndex = index;
          break;
        }
      }
      _dummy = json.slice(_minIndex, _lastIndex);
    } else if (period === '2y') {
      const _max = json[json.length - 1][0];
      const _min = _max - (2 * 365 * 24 * 3600 * 1000);
      let _minIndex = -1;
      const _lastIndex = json.length - 1;
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        if (element[0] >= _min) {
          _minIndex = index;
          break;
        }
      }
      _dummy = json.slice(_minIndex, _lastIndex);
    } else if (period === '3y') {
      const _max = json[json.length - 1][0];
      const _min = _max - (3 * 365 * 24 * 3600 * 1000);
      let _minIndex = -1;
      const _lastIndex = json.length - 1;
      for (let index = 0; index < json.length; index++) {
        const element = json[index];
        if (element[0] >= _min) {
          _minIndex = index;
          break;
        }
      }
      _dummy = json.slice(_minIndex, _lastIndex);
    }
    return _dummy;
  }
}
