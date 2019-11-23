import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
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

  constructor(public textConfig: TextConfig, private mewDataService: MewDataService) {
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
      pointRadius: 0,
      pointRotation: 45,
      pointStyle: "cross",
    }
    this.chartDataSets = [this.defaultChartDataSet];
    this.chartType = "scatter";
  }

  ngOnInit() {
  }

  refresh() {
    this.chartDataSets = [{
      data: [],
    }];
    this.mewDataService.fetchChartData(this.getViewData()).subscribe(data => {
      this.chartDataSets = [];
      let layers: Layer[] = this.getViewData();
      layers.forEach(layer => {
        let layerData = data[layer.id];
        for (let index = 0; index < layer.fibers; index++) {
          let fiberData = layerData[index];
          let chartDataSet: ChartDataSets = {
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
            data: [],
          }
          if (Object.keys(fiberData).includes("sinePoints")) {
            fiberData.sinePoints.forEach(pt => {
              chartDataSet.data.push(pt);
            });
          }
          else {
            chartDataSet.data.push(fiberData["origin"]);
            chartDataSet.data.push(fiberData["target"]);
          }
          this.chartDataSets.push(chartDataSet);
        }
      });
    },
    error => {
      alert("Error: Couldn't reach server.");
      console.log(error);
    });
  }

  getViewData(): Layer[] {
    let layers: Layer[] = this.data.filter(layer => layer.isSelected);
    if (layers.length === 0) {
      this.mewDataService.getScaffoldsOfPrint(this.mewDataService.print).filter(scaffold => scaffold.isSelected).forEach(scaffold => {
        let pushLayers: Layer[] = scaffold.children as Layer[];
        layers = layers.concat(pushLayers);
      });
    }
    return layers;
  }
}
