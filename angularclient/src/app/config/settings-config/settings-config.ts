import { Injectable } from '@angular/core';
import { TextConfig } from '../text-config/text-config';

@Injectable({
  providedIn: 'root'
})
export class SettingsConfig {

  static instance: SettingsConfig;

  multiSelectOn: boolean;

  defaultScaffoldName: string;
  defaultScaffoldPositionX: number;
  defaultScaffoldPositionY: number;

  defaultLayerName: string;
  defaultLayerAngle: number;

  defaultFiberName: string;
  defaultFiberLength: number;
  defaultFiberDistanceToNextFiber: number;

  constructor(private textConfig: TextConfig) {
    SettingsConfig.instance = this;

    this.multiSelectOn = true;

    this.defaultScaffoldName = textConfig.scaffold;
    this.defaultScaffoldPositionX = 0;
    this.defaultScaffoldPositionY = 0;

    this.defaultLayerName = textConfig.layer;
    this.defaultLayerAngle = 0;

    this.defaultFiberName = textConfig.fiber;
    this.defaultFiberLength = 15;
    this.defaultFiberDistanceToNextFiber = 0.5;
  }
}
