import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType, ChartPoint, ChartData } from 'chart.js';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { Layer } from 'src/app/model/layer/layer';
import { MewDataService } from 'src/app/service/mew-data/mew-data.service';

@Component({
  selector: 'app-mew-data-chart',
  templateUrl: './mew-data-chart.component.html',
  styleUrls: ['./mew-data-chart.component.scss']
})
export class MewDataChartComponent implements OnInit {

  @Input() data: Layer[];

  chartDataSets: ChartDataSets[];
  chartOptions: ChartOptions;
  chartType: ChartType;

  private readonly defaultChartDataSet: ChartDataSets;

  constructor(private textConfig: TextConfig, private mewDataService: MewDataService) {
    this.data = [];
    this.chartOptions = {
      responsive: true,
      aspectRatio: 1,
      showLines: true,
      legend: {
        display: false,
      },
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
      responsiveAnimationDuration: 0,
    }
    this.defaultChartDataSet = {
      backgroundColor: "transparent",
      borderColor: "rgba(0, 0, 0, 1)",
      borderWidth: 1,
      data: [],
      lineTension: 0,
      pointBackgroundColor: "rgba(0, 0, 0, 1)",
      pointBorderColor: "rgba(0, 0, 0, 1)",
      pointHoverBackgroundColor: "rgba(0, 0, 0, 1)",
      pointHoverBorderColor: "rgba(0, 0, 0, 1)",
      pointRadius: 5,
      pointRotation: 45,
      pointStyle: "cross",
    }
    this.chartDataSets = [this.defaultChartDataSet];
    this.chartType = "scatter";
  }

  ngOnInit() {
  }

  // TODO: evaluate? optimize?
  ngOnChanges() {
    this.refresh();
  }

  // TODO: backend calculation
  // TODO: implement angle and size
  // TODO: cleanup into service
  // TODO: fix .000000001 stuff
  refresh() {
    this.chartDataSets = [{
      data: [],
    }];
    for (let index = 0; index < 3; index++) {
      this.chartDataSets.push({
        backgroundColor: this.defaultChartDataSet.backgroundColor,
        borderColor: this.defaultChartDataSet.borderColor,
        borderWidth: this.defaultChartDataSet.borderWidth,
        lineTension: this.defaultChartDataSet.lineTension,
        pointBackgroundColor: this.defaultChartDataSet.pointBackgroundColor,
        pointBorderColor: this.defaultChartDataSet.pointBorderColor,
        pointHoverBackgroundColor: this.defaultChartDataSet.pointHoverBackgroundColor,
        pointHoverBorderColor: this.defaultChartDataSet.pointHoverBorderColor,
        pointRadius: this.defaultChartDataSet.pointRadius,
        pointRotation: this.defaultChartDataSet.pointRotation,
        pointStyle: this.defaultChartDataSet.pointStyle,
        data: [{
          x: Math.random() * 100,
          y: Math.random() * 100,
        }, {
          x: Math.random() * 100,
          y: Math.random() * 100,
        }, {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },],
      });
    }
  }

  getViewData(): Layer[] {
    return this.data.filter(layer => layer.isSelected);
  }
}
