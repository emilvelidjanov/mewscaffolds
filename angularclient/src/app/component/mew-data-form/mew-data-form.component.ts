import { Component, OnInit, Input } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { MewData } from 'src/app/model/abstract/mew-data';
import { MewDataService } from 'src/app/service/mew-data/mew-data.service';
import { Vector } from 'src/app/model/vector/vector';
import { MewDataProperties } from 'src/app/enum/mew-data-properties';
import { Layer } from 'src/app/model/layer/layer';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';

// TODO: cleanup
// TODO: sanitize input and error messages (error checking, too)
@Component({
  selector: 'app-mew-data-form',
  templateUrl: './mew-data-form.component.html',
  styleUrls: ['./mew-data-form.component.scss']
})
export class MewDataFormComponent implements OnInit {

  @Input() data: MewData[];
  @Input() label: string;
  @Input() dataLabel: string;

  isFormVisible: boolean;
  readonly mewDataProperties: any;
  hasPropertyMap: Map<string, boolean>;
  private hasPropertyMapIsPopulated: boolean;

  name: string;
  nameInputPlaceholder: string;
  position: Vector;
  positionXInputPlaceholder: string;
  positionYInputPlaceholder: string;
  angle: number;
  angleInputPlaceholder: string;
  width: number;
  widthInputPlaceholder: string;
  height: number;
  heightInputPlaceholder: string;
  distanceBetweenFibers: number;
  distanceBetweenFibersInputPlaceholder: string;
  fibers: number;
  fibersInputPlaceholder: string;
  speed: number;
  speedInputPlaceholder: string;
  temperature: number;
  temperatureInputPlaceholder: string;
  pressure: number;
  pressureInputPlaceholder: string;
  loopSpeed: number;
  loopSpeedInputPlaceholder: string;
  loopRadius: number;
  loopRadiusInputPlaceholder: string;
  waitIn: number;
  waitInInputPlaceholder: string;
  waitOut: number;
  waitOutInputPlaceholder: string;
  zDistance: number;
  zDistanceInputPlaceholder: string;
  isSinusoidal: boolean;
  amplitude: number;
  amplitudeInputPlaceholder: string;
  phase: number;
  phaseInputPlaceholder: string;
  phaseShift: number;
  phaseShiftInputPlaceholder: string;

  readonly nameInputName: string;
  readonly positionXInputName: string;
  readonly positionYInputName: string;
  readonly angleInputName: string;
  readonly widthInputName: string;
  readonly heightInputName: string;
  readonly distanceBetweenFibersInputName: string;
  readonly fibersInputName: string;
  readonly speedInputName: string;
  readonly temperatureInputName: string;
  readonly pressureInputName: string;
  readonly loopSpeedInputName: string;
  readonly loopRadiusInputName: string;
  readonly waitInInputName: string;
  readonly waitOutInputName: string;
  readonly zDistanceInputName: string;
  readonly isSinusoidalInputName: string;
  readonly amplitudeInputName: string;
  readonly phaseInputName: string;
  readonly phaseShiftInputName: string;

  constructor(private textConfig: TextConfig, private mewDataService: MewDataService, private settingsConfig: SettingsConfig) {
    this.data = [];
    this.label = "";
    this.dataLabel = "";

    this.isFormVisible = false;
    this.mewDataProperties = MewDataProperties;
    this.hasPropertyMap = new Map<string, boolean>([
      [MewDataProperties.NAME, false],
      [MewDataProperties.POSITION, false],
      [MewDataProperties.ANGLE, false],
      [MewDataProperties.DISTANCE_BETWEEN_FIBERS, false],
      [MewDataProperties.FIBERS, false],
      [MewDataProperties.HEIGHT, false],
      [MewDataProperties.WIDTH, false],
      [MewDataProperties.SPEED, false],
      [MewDataProperties.TEMPERATURE, false],
      [MewDataProperties.PRESSURE, false],
      [MewDataProperties.LOOP_SPEED, false],
      [MewDataProperties.LOOP_RADIUS, false],
      [MewDataProperties.WAIT_IN, false],
      [MewDataProperties.WAIT_OUT, false],
      [MewDataProperties.Z_DISTANCE, false],
      [MewDataProperties.IS_SINUSOIDAL, false],
      [MewDataProperties.AMPLITUDE, false],
      [MewDataProperties.PHASE, false],
      [MewDataProperties.PHASE_SHIFT, false],
    ]);
    this.hasPropertyMapIsPopulated = false;

    this.initializeForm("");

    this.nameInputName = MewDataProperties.NAME;
    this.positionXInputName = MewDataProperties.POSITION + "X";
    this.positionYInputName = MewDataProperties.POSITION + "Y";
    this.angleInputName = MewDataProperties.ANGLE;
    this.widthInputName = MewDataProperties.WIDTH;
    this.heightInputName = MewDataProperties.HEIGHT;
    this.fibersInputName = MewDataProperties.FIBERS;
    this.distanceBetweenFibersInputName = MewDataProperties.DISTANCE_BETWEEN_FIBERS;

    this.speedInputName = MewDataProperties.SPEED;
    this.temperatureInputName = MewDataProperties.TEMPERATURE;
    this.pressureInputName = MewDataProperties.PRESSURE;
    this.loopSpeedInputName = MewDataProperties.LOOP_SPEED;
    this.loopRadiusInputName = MewDataProperties.LOOP_RADIUS;
    this.waitInInputName = MewDataProperties.WAIT_IN;
    this.waitOutInputName = MewDataProperties.WAIT_OUT;
    this.zDistanceInputName = MewDataProperties.Z_DISTANCE;
    this.isSinusoidalInputName = MewDataProperties.IS_SINUSOIDAL;
    this.amplitudeInputName = MewDataProperties.AMPLITUDE;
    this.phaseInputName = MewDataProperties.PHASE;
    this.phaseShiftInputName = MewDataProperties.PHASE_SHIFT;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.hasPropertyMapIsPopulated && this.data.length > 0) {
      Object.keys(this.data[0]).forEach(key => {
        if (this.hasPropertyMap.has(key) && this.hasPropertyMap.get(key) === false) {
          this.hasPropertyMap.set(key, true);
        }
      });
      this.hasPropertyMapIsPopulated = true;
    }

    let viewData: MewData[] = this.getSelectedData();
    this.isFormVisible = true;
    if (viewData.length === 1) {
      let properties: [string, any][] = Object.entries(viewData[0]);
      properties.forEach(property => {
        switch (property[0]) {
          case MewDataProperties.NAME:
            this.name = property[1];
            this.nameInputPlaceholder = this.textConfig.nameInputPlaceholder;
            break;
          case MewDataProperties.POSITION:
            this.position = property[1];
            this.positionXInputPlaceholder = this.textConfig.positionXInputPlaceholder;
            this.positionYInputPlaceholder = this.textConfig.positionYInputPlaceholder;
            break;
          case MewDataProperties.ANGLE:
            this.angle = property[1];
            this.angleInputPlaceholder = this.textConfig.angleInputPlaceholder;
            break;
          case MewDataProperties.WIDTH:
            this.width = property[1];
            this.widthInputPlaceholder = this.textConfig.widthInputPlaceholder;
            break;
          case MewDataProperties.HEIGHT:
            this.height = property[1];
            this.heightInputPlaceholder = this.textConfig.heightInputPlaceholder;
            break;
          case MewDataProperties.FIBERS:
            this.fibers = property[1];
            this.fibersInputPlaceholder = this.textConfig.fibersInputPlaceholder;
            break;
          case MewDataProperties.DISTANCE_BETWEEN_FIBERS:
            this.distanceBetweenFibers = property[1];
            this.distanceBetweenFibersInputPlaceholder = this.textConfig.distanceBetweenFibersInputPlaceholder;
            break;
          case MewDataProperties.SPEED:
            this.speed = property[1];
            this.speedInputPlaceholder = this.textConfig.speedInputPlaceholder;
            break;
          case MewDataProperties.TEMPERATURE:
            this.temperature = property[1];
            this.temperatureInputPlaceholder = this.textConfig.temperatureInputPlaceholder;
            break;
          case MewDataProperties.PRESSURE:
            this.pressure = property[1];
            this.pressureInputPlaceholder = this.textConfig.pressureInputPlaceholder;
            break;
          case MewDataProperties.LOOP_SPEED:
            this.loopSpeed = property[1];
            this.loopSpeedInputPlaceholder = this.textConfig.loopSpeedInputPlaceholder;
            break;
          case MewDataProperties.LOOP_RADIUS:
            this.loopRadius = property[1];
            this.loopRadiusInputPlaceholder = this.textConfig.loopRadiusInputPlaceholder;
            break;
          case MewDataProperties.WAIT_IN:
            this.waitIn = property[1];
            this.waitInInputPlaceholder = this.textConfig.waitInInputPlaceholder;
            break;
          case MewDataProperties.WAIT_OUT:
            this.waitOut = property[1];
            this.waitOutInputPlaceholder = this.textConfig.waitOutInputPlaceholder;
            break;
          case MewDataProperties.Z_DISTANCE:
            this.zDistance = property[1];
            this.zDistanceInputPlaceholder = this.textConfig.zDistanceInputPlaceholder;
            break;
          case MewDataProperties.IS_SINUSOIDAL:
            this.isSinusoidal = property[1];
            break;
          case MewDataProperties.AMPLITUDE:
            this.amplitude = property[1];
            this.amplitudeInputPlaceholder = this.textConfig.amplitudeInputPlaceholder;
            break;
          case MewDataProperties.PHASE:
            this.phase = property[1];
            this.phaseInputPlaceholder = this.textConfig.phaseInputPlaceholder;
            break;
          case MewDataProperties.PHASE_SHIFT:
            this.phaseShift = property[1];
            this.phaseShiftInputPlaceholder = this.textConfig.phaseShiftInputPlaceholder;
            break;
        }
      });
    }
    else if (viewData.length > 1) {
      this.initializeForm(this.textConfig.multiplePlaceholder);
    }
    else {
      this.isFormVisible = false;
    }
  }

  getSelectedData(): MewData[] {
    return this.data.filter(item => item.isSelected);
  }

  onInput(name: string, value: string) {
    let concreteLayer: Layer = null;
    this.getSelectedData().forEach(item => {
      switch (name) {
        case this.nameInputName:
          item[MewDataProperties.NAME] = value;
          break;
        case this.positionXInputName:
          item[MewDataProperties.POSITION].x = parseFloat(value);
          break;
        case this.positionYInputName:
          item[MewDataProperties.POSITION].y = parseFloat(value);
          break;
        case this.angleInputName:
          item[MewDataProperties.ANGLE] = parseFloat(value);
          break;
        case this.fibersInputName: // this case shouldn't happen
          item[MewDataProperties.FIBERS] = parseInt(value);
          break;
        case this.widthInputName:
          item[MewDataProperties.WIDTH] = parseFloat(value);
          break;
        case this.heightInputName:
          concreteLayer = item as Layer;
          item[MewDataProperties.HEIGHT] = parseFloat(value);
          item[MewDataProperties.FIBERS] = this.mewDataService.calculateFibersOfLayer(concreteLayer);
          break;
        case this.distanceBetweenFibersInputName:
          concreteLayer = item as Layer;
          item[MewDataProperties.DISTANCE_BETWEEN_FIBERS] = parseFloat(value);
          item[MewDataProperties.FIBERS] = this.mewDataService.calculateFibersOfLayer(concreteLayer);
          break;
        case this.speedInputName:
          item[MewDataProperties.SPEED] = parseFloat(value);
          break;
        case this.temperatureInputName:
          item[MewDataProperties.TEMPERATURE] = parseFloat(value);
          break;
        case this.pressureInputName:
          item[MewDataProperties.PRESSURE] = parseFloat(value);
          break;
        case this.loopSpeedInputName:
          item[MewDataProperties.LOOP_SPEED] = parseFloat(value);
          break;
        case this.loopRadiusInputName:
          item[MewDataProperties.LOOP_RADIUS] = parseFloat(value);
          break;
        case this.waitInInputName:
          item[MewDataProperties.WAIT_IN] = parseFloat(value);
          break;
        case this.waitOutInputName:
          item[MewDataProperties.WAIT_OUT] = parseFloat(value);
          break;
        case this.zDistanceInputName:
          item[MewDataProperties.Z_DISTANCE] = parseFloat(value);
          break;
        case this.isSinusoidalInputName:
          item[MewDataProperties.IS_SINUSOIDAL] = Boolean(value);
          break;
        case this.amplitudeInputName:
          item[MewDataProperties.AMPLITUDE] = parseFloat(value);
          break;
        case this.phaseInputName:
          item[MewDataProperties.PHASE] = parseFloat(value);
          break;
        case this.phaseShiftInputName:
          item[MewDataProperties.PHASE_SHIFT] = parseFloat(value);
          break;
      }
    });
    this.mewDataService.pushNextPrint(this.mewDataService.print);
  }

  recalculatePaths() {
    this.getSelectedData().forEach(item => {
      this.mewDataService.recalculatePathsRecursive(item);
    });
  }

  private initializeForm(initString: string) {
    this.name = null;
    this.nameInputPlaceholder = initString;
    this.position = null;
    this.positionXInputPlaceholder = initString;
    this.positionYInputPlaceholder = initString;
    this.angle = null;
    this.angleInputPlaceholder = initString;
    this.width = null;
    this.widthInputPlaceholder = initString;
    this.height = null;
    this.heightInputPlaceholder = initString;
    this.fibers = null;
    this.fibersInputPlaceholder = initString;
    this.distanceBetweenFibers = null;
    this.distanceBetweenFibersInputPlaceholder = initString;
    this.speed = null;
    this.speedInputPlaceholder = initString;
    this.temperature = null;
    this.temperatureInputPlaceholder = initString;
    this.pressure = null;
    this.pressureInputPlaceholder = initString;
    this.loopSpeed = null;
    this.loopSpeedInputPlaceholder = initString;
    this.loopRadius = null;
    this.loopRadiusInputPlaceholder = initString;
    this.waitIn = null;
    this.waitInInputPlaceholder = initString;
    this.waitOut = null;
    this.waitOutInputPlaceholder = initString;
    this.zDistance = null;
    this.zDistanceInputPlaceholder = initString;
    this.isSinusoidal = false;
    this.amplitude = null;
    this.amplitudeInputPlaceholder = initString;
    this.phase = null;
    this.phaseInputPlaceholder = initString;
    this.phaseShift = null;
    this.phaseShiftInputPlaceholder = initString;
  }
}
