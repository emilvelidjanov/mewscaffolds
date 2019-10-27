import { Injectable } from '@angular/core';
import { TextConfig } from '../text-config/text-config';

@Injectable({
  providedIn: 'root'
})
export class SettingsConfig {

  static instance: SettingsConfig;

  printAreaBottomLeftX: number;
  printAreaBottomLeftY: number;
  printAreaTopRightX: number;
  printAreaTopRightY: number;

  multiSelectOn: boolean;

  defaultScaffoldName: string;
  defaultScaffoldPositionX: number;
  defaultScaffoldPositionY: number;

  defaultLayerName: string;
  defaultLayerAngle: number;
  defaultLayerWidth: number;
  defaultLayerHeight: number;
  defaultDistanceBetweenFibers: number;

  // TODO: add to settings
  slideWidth: number;
  slideHeight: number;

  constructor(private textConfig: TextConfig) {
    SettingsConfig.instance = this;

    this.printAreaBottomLeftX = 71;
    this.printAreaBottomLeftY = 212;
    this.printAreaTopRightX = 223;
    this.printAreaTopRightY = 134;

    this.multiSelectOn = true;

    this.defaultScaffoldName = "Scaffold";
    let smallerX = Math.min(this.printAreaTopRightX, this.printAreaBottomLeftX);
    let smallerY = Math.min(this.printAreaTopRightY, this.printAreaBottomLeftY);
    this.defaultScaffoldPositionX = Math.abs(this.printAreaTopRightX - this.printAreaBottomLeftX) / 2 + smallerX;
    this.defaultScaffoldPositionY = Math.abs(this.printAreaTopRightY - this.printAreaBottomLeftY) / 2 + smallerY;

    this.defaultLayerName = "Layer";
    this.defaultLayerAngle = 0;
    this.defaultLayerHeight = 15;
    this.defaultLayerWidth = 15;
    this.defaultDistanceBetweenFibers = 0.5;

    this.slideWidth = 76;
    this.slideHeight = 26;
  }
}
