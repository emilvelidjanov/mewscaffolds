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
    this.chartDataSets = [{
      data: [],
    }];
    this.chartType = "scatter";
  }

  ngOnInit() {
  }

  // TODO: backend calculation
  // TODO: implement angle and size
  // TODO: cleanup into service
  // TODO: fix .000000001 stuff
  ngOnChanges() {
    let viewData: Layer[] = this.getViewData();
    if (viewData.length > 0) {
      this.chartDataSets = [];
    }
    else {
      this.chartDataSets = [{
        data: [],
      }];
    }
  }

  getViewData(): Layer[] {
    return this.data.filter(layer => layer.isSelected);
  }
}
