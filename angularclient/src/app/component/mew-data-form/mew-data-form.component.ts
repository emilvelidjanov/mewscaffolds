import { Component, OnInit, Input } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { MewData } from 'src/app/model/abstract/mew-data';
import { MewDataService } from 'src/app/service/mew-data/mew-data.service';
import { Vector } from 'src/app/model/vector/vector';
import { MewDataProperties } from 'src/app/enum/mew-data-properties';

// TODO: cleanup
// TODO: sanitize input and error messages (error checking, too)
// TODO: add missing data
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
  length: number;
  lengthInputPlaceholder: string;
  distanceToNextFiber: number;
  distanceToNextFiberInputPlaceholder: string;

  readonly nameInputName: string;
  readonly positionXInputName: string;
  readonly positionYInputName: string;
  readonly angleInputName: string;
  readonly lengthInputName: string;
  readonly distanceToNextFiberInputName: string;

  constructor(private textConfig: TextConfig, private mewDataService: MewDataService) {
    this.data = [];
    this.label = "";
    this.dataLabel = "";

    this.isFormVisible = false;
    this.mewDataProperties = MewDataProperties;
    this.hasPropertyMap = new Map<string, boolean>([
      [MewDataProperties.NAME, false],
      [MewDataProperties.POSITION, false],
      [MewDataProperties.ANGLE, false],
      [MewDataProperties.LENGTH, false],
      [MewDataProperties.DISTANCE_TO_NEXT_FIBER, false],
    ]);
    this.hasPropertyMapIsPopulated = false;
    
    this.initializeForm("");

    this.nameInputName = MewDataProperties.NAME;
    this.positionXInputName = MewDataProperties.POSITION + "X";
    this.positionYInputName = MewDataProperties.POSITION + "Y";
    this.angleInputName = MewDataProperties.ANGLE;
    this.lengthInputName = MewDataProperties.LENGTH;
    this.distanceToNextFiberInputName = MewDataProperties.DISTANCE_TO_NEXT_FIBER;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.hasPropertyMapIsPopulated && this.data.length > 0) {
      Object.keys(this.data[0]).forEach(key => {
        if (this.hasPropertyMap.get(key) === false) {
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
          case MewDataProperties.LENGTH:
            this.length = property[1];
            this.lengthInputPlaceholder = this.textConfig.lengthInputPlaceholder;
            break;
          case MewDataProperties.DISTANCE_TO_NEXT_FIBER:
            this.distanceToNextFiber = property[1];
            this.distanceToNextFiberInputPlaceholder = this.textConfig.distanceToNextFiberInputPlaceholder;
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
        case this.lengthInputName:
          item[MewDataProperties.LENGTH] = parseFloat(value);
          break;
        case this.distanceToNextFiberInputName:
          item[MewDataProperties.DISTANCE_TO_NEXT_FIBER] = parseFloat(value);
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
    this.length = null;
    this.lengthInputPlaceholder = initString;
    this.distanceToNextFiber = null;
    this.distanceToNextFiberInputPlaceholder = initString;
  }
}
