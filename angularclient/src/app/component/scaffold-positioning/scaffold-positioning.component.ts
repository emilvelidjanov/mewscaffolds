import { Component, OnInit, Input } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { Scaffold } from 'src/app/model/scaffold/scaffold';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';
import { MewDataService } from 'src/app/service/mew-data/mew-data.service';
import { ChartDataSets, ChartOptions, ChartType, ChartYAxe, ChartData, ChartScales } from 'chart.js';

@Component({
  selector: 'app-scaffold-positioning',
  templateUrl: './scaffold-positioning.component.html',
  styleUrls: ['./scaffold-positioning.component.scss']
})
export class ScaffoldPositioningComponent implements OnInit {

  @Input() data: Scaffold[];

  chartDataSets: ChartDataSets[];
  chartOptions: ChartOptions;
  chartType: ChartType;
  
  private readonly defaultChartDataSet: ChartDataSets;

  private readonly slideHeight: number;
  private readonly slideWidth: number;

  constructor(private textConfig: TextConfig, private settingsConfig: SettingsConfig, private mewDataService: MewDataService) { 
    this.data = [];
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
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

    this.slideHeight = settingsConfig.slideHeight;
    this.slideWidth = settingsConfig.slideWidth;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.chartDataSets.splice(0, this.chartDataSets.length);
    this.setPrintArea();
    this.setSlides();
    this.setScaffoldData();
  }

  private setPrintArea() {
    let set: ChartDataSets = this.copyDefaultChartDataSet();
    set.data = [
      {x: this.settingsConfig.printAreaBottomLeftX, y: this.settingsConfig.printAreaBottomLeftY},
      {x: this.settingsConfig.printAreaTopRightX, y: this.settingsConfig.printAreaBottomLeftY},
      {x: this.settingsConfig.printAreaTopRightX, y: this.settingsConfig.printAreaTopRightY},
      {x: this.settingsConfig.printAreaBottomLeftX, y: this.settingsConfig.printAreaTopRightY},
      {x: this.settingsConfig.printAreaBottomLeftX, y: this.settingsConfig.printAreaBottomLeftY},
    ];
    set.pointRadius = 0;
    set.pointHitRadius = 0;
    this.chartDataSets.push(set);
  }

  private setSlides() {
    let smallerX = Math.min(this.settingsConfig.printAreaTopRightX, this.settingsConfig.printAreaBottomLeftX);
    let largerX = Math.max(this.settingsConfig.printAreaTopRightX, this.settingsConfig.printAreaBottomLeftX);
    let smallerY = Math.min(this.settingsConfig.printAreaTopRightY, this.settingsConfig.printAreaBottomLeftY);
    let largerY = Math.max(this.settingsConfig.printAreaTopRightY, this.settingsConfig.printAreaBottomLeftY);
    for (let x: number = smallerX; x <= largerX; x += this.slideWidth) {
      let set: ChartDataSets = this.copyDefaultChartDataSet();
      set.borderColor = "rgba(0, 0, 0, 0.5)";
      set.pointRadius = 0;
      set.pointHitRadius = 0;
      set.data = [
        {x: x, y: smallerY},
        {x: x, y: largerY},
      ];
      this.chartDataSets.push(set);
    }
    for (let y: number = smallerY; y <= largerY; y += this.slideHeight) {
      let set: ChartDataSets = this.copyDefaultChartDataSet();
      set.borderColor = "rgba(0, 0, 0, 0.5)";
      set.pointRadius = 0;
      set.pointHitRadius = 0;
      set.data = [
        {x: smallerX, y: y},
        {x: largerX, y: y},
      ];
      this.chartDataSets.push(set);
    }
  }

  private setScaffoldData() {
    this.data.forEach(scaffold => {
      let scaff: Scaffold = scaffold as Scaffold;
      let radius: number = this.mewDataService.getRadiusOfScaffold(scaffold);
      let x: number = scaff.position.x;
      let y: number = scaff.position.y;
      let set: ChartDataSets = this.copyDefaultChartDataSet();
      set.data = [
        {x: x - radius, y: y + radius},
        {x: x + radius, y: y + radius},
        {x: x + radius, y: y - radius},
        {x: x - radius, y: y - radius},
        {x: x - radius, y: y + radius},
      ];
      this.chartDataSets.push(set);
      let center: ChartDataSets = this.copyDefaultChartDataSet();
      center.data = [
        {x: x, y: y},
      ]
      this.chartDataSets.push(center);
    });
  }

  private copyDefaultChartDataSet(): ChartDataSets {
    let ret: any = {
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
    }
    return ret as ChartDataSets;
  }
}
