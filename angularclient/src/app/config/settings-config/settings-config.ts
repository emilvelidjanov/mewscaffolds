import { Injectable } from '@angular/core';
import { TextConfig } from '../text-config/text-config';
import { MewDataColor } from 'src/app/enum/mew-data-color';
import { Vector } from 'src/app/model/vector/vector';

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

  positionSlots: Vector[];

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

    this.recalculatePositionSlots();

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

  recalculatePositionSlots(): void {
    this.positionSlots = [];
    const smallerX: number = Math.min(this.printAreaTopRightX, this.printAreaBottomLeftX);
    const largerX: number = Math.max(this.printAreaTopRightX, this.printAreaBottomLeftX);
    const smallerY: number = Math.min(this.printAreaTopRightY, this.printAreaBottomLeftY);
    const largerY: number = Math.max(this.printAreaTopRightY, this.printAreaBottomLeftY);
    const scaleX: number = Math.sign(this.printAreaTopRightX - this.printAreaBottomLeftX);
    const scaleY: number = Math.sign(this.printAreaTopRightY - this.printAreaBottomLeftY);
    const slidesX: number = Math.round((largerX - smallerX) / this.slideWidth);
    const slidesY: number = Math.round((largerY - smallerY) / this.slideHeight);
    const slotsPerSlide: number = 3;
    const fractionX: number = 1 / slotsPerSlide
    const fractionY: number = 1 / 2;
    let yCoord: number = largerY + (this.slideHeight * fractionY * scaleY);
    for (let y: number = 0; y < slidesY; y++) {
      let xCoord: number = smallerX + (this.slideWidth * fractionX / 2 * scaleX);
      for (let x: number = 0; x < slidesX; x++) {
        for (let s: number = 0; s < slotsPerSlide; s++) {
          this.positionSlots.push(new Vector(Math.round(xCoord + s * fractionX * this.slideWidth * scaleX), Math.round(yCoord)));
          
        }
        xCoord += this.slideWidth * scaleX;
      }
      yCoord += this.slideHeight * scaleY;
    }
    console.log(this.positionSlots);
  }
}
