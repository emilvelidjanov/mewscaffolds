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

  constructor(private textConfig: TextConfig) {
    SettingsConfig.instance = this;

    this.printAreaBottomLeftX = 71;
    this.printAreaBottomLeftY = 212;
    this.printAreaTopRightX = 230;
    this.printAreaTopRightY = 40;

    this.multiSelectOn = true;

    this.defaultScaffoldName = textConfig.scaffold;
    this.defaultScaffoldPositionX = 0;
    this.defaultScaffoldPositionY = 0;

    this.defaultLayerName = textConfig.layer;
    this.defaultLayerAngle = 0;
    this.defaultLayerHeight = 15;
    this.defaultLayerWidth = 15;
    this.defaultDistanceBetweenFibers = 0.5;
  }
}
