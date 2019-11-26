import { Injectable } from '@angular/core';
import { TextConfig } from '../text-config/text-config';
import { MewDataColor } from 'src/app/enum/mew-data-color';

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
  advancedModeOn: boolean;

  defaultScaffoldName: string;
  defaultScaffoldPositionX: number;
  defaultScaffoldPositionY: number;
  defaultScaffoldColor: string;

  defaultLayerName: string;
  defaultLayerAngle: number;
  defaultLayerWidth: number;
  defaultLayerHeight: number;
  defaultDistanceBetweenFibers: number;

  slideWidth: number;
  slideHeight: number;

  defaultLayerSpeed: number;
  defaultLayerPressure: number;
  defaultLayerTemperature: number;
  defaultLayerLoopSpeed: number;
  defaultLayerLoopRadius: number;
  defaultLayerWaitIn: number;
  defaultLayerWaitOut: number;
  defaultLayerZDistance: number;

  defaultLayerIsSinusoidal: boolean;
  defaultLayerAmplitude: number;
  defaultLayerPhase: number;
  defaultLayerPhaseShift: number;

  constructor(private textConfig: TextConfig) {
    SettingsConfig.instance = this;

    this.printAreaBottomLeftX = 71;
    this.printAreaBottomLeftY = 212;
    this.printAreaTopRightX = 223;
    this.printAreaTopRightY = 134;

    this.multiSelectOn = false;
    this.advancedModeOn = false;

    this.defaultScaffoldName = "Scaffold";
    let smallerX = Math.min(this.printAreaTopRightX, this.printAreaBottomLeftX);
    let smallerY = Math.min(this.printAreaTopRightY, this.printAreaBottomLeftY);
    this.defaultScaffoldPositionX = Math.abs(this.printAreaTopRightX - this.printAreaBottomLeftX) / 2 + smallerX;
    this.defaultScaffoldPositionY = Math.abs(this.printAreaTopRightY - this.printAreaBottomLeftY) / 2 + smallerY;
    this.defaultScaffoldColor = MewDataColor.RED;

    this.defaultLayerName = "Layer";
    this.defaultLayerAngle = 0;
    this.defaultLayerHeight = 15;
    this.defaultLayerWidth = 15;
    this.defaultDistanceBetweenFibers = 0.5;

    this.slideWidth = 76;
    this.slideHeight = 26;

    this.defaultLayerTemperature = 770;
    this.defaultLayerPressure = 40;
    this.defaultLayerSpeed = 300;
    this.defaultLayerLoopSpeed = 300;
    this.defaultLayerLoopRadius = 2 * this.defaultDistanceBetweenFibers;
    this.defaultLayerWaitIn = 0.2;
    this.defaultLayerWaitOut = 0.06;
    this.defaultLayerZDistance = 4;
    this.defaultLayerIsSinusoidal = false;
    this.defaultLayerAmplitude = 0.25;
    this.defaultLayerPhase = 1;
    this.defaultLayerPhaseShift = 0;
  }
}
