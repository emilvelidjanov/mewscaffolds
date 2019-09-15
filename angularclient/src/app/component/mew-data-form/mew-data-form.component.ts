import { Component, OnInit, Input } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { MewData } from 'src/app/model/abstract/mew-data';
import { MewDataService } from 'src/app/service/mew-data/mew-data.service';
import { Vector } from 'src/app/model/vector/vector';

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

  // TODO: cleanup
  name: string;
  nameInputPlaceholder: string;
  nameInputName: string;
  position: Vector;
  positionXInputPlaceholder: string;
  positionYInputPlaceholder: string;
  positionXInputName: string;
  positionYInputName: string;
  angle: number;
  angleInputPlaceholder: string;
  angleInputName: string;
  length: number;
  lengthInputPlaceholder: string;
  lengthInputName: string;
  distanceToNextFiber: number;
  distanceToNextFiberInputPlaceholder: string;
  distanceToNextFiberInputName: string;

  constructor(private textConfig: TextConfig, private mewDataService: MewDataService) {
    this.data = [];
    this.label = "";
    this.dataLabel = "";
    this.name = null;
    this.nameInputPlaceholder = "";
    this.nameInputName = "name";
    this.position = null;
    this.positionXInputPlaceholder = "";
    this.positionYInputPlaceholder = "";
    this.positionXInputName = "positionX";
    this.positionYInputName = "positionY";
    this.angle = null;
    this.angleInputPlaceholder = "";
    this.angleInputName = "angle";
    this.length = null;
    this.lengthInputPlaceholder = "";
    this.lengthInputName = "length";
    this.distanceToNextFiber = null;
    this.distanceToNextFiberInputPlaceholder = "";
    this.distanceToNextFiberInputName = "distanceToNextFiber";
  }

  ngOnInit() {
  }

  // TODO: fix multiple placeholder
  ngOnChanges() {
    let viewData: MewData = this.getViewData();
    if (viewData != null) {
      let properties: [string, any][]  = Object.entries(viewData);
      properties.forEach(property => {
        switch (property[0]) {
          case "name":
            this.name = property[1];
            this.nameInputPlaceholder = this.textConfig.nameInputPlaceholder;
            break;
          case "position":
            this.position = property[1];
            this.positionXInputPlaceholder = this.textConfig.positionXInputPlaceholder;
            this.positionYInputPlaceholder = this.textConfig.positionYInputPlaceholder;
            break;
          case "angle":
            this.angle = property[1];
            this.angleInputPlaceholder = this.textConfig.angleInputPlaceholder;
            break;
          case "length":
            this.length = property[1];
            this.lengthInputPlaceholder = this.textConfig.lengthInputPlaceholder;
            break;
          case "distanceToNextFiber":
            this.distanceToNextFiber = property[1];
            this.distanceToNextFiberInputPlaceholder = this.textConfig.distanceToNextFiberInputPlaceholder;
            break;
        }
      });
    }
  }

  getViewData(): MewData {
    let selected: MewData[] = this.getSelectedData();
    let viewData: MewData = null;
    if (selected.length == 1) {
      viewData = selected.pop();
    }
    return viewData;
  }

  getSelectedData(): MewData[] {
    return this.data.filter(token => token.isSelected);
  }

  // TODO: cleanup
  onInput(name: string, value: string) {
    this.getSelectedData().forEach(item => {
      switch (name) {
        case this.nameInputName:
          item["name"] = value;
          break;
        case this.positionXInputName:
          item["position"].x = parseFloat(value);
          break;
        case this.positionYInputName:
          item["position"].y = parseFloat(value);
          break;
        case this.angleInputName:
          item["angle"] = parseFloat(value);
          break;
        case this.lengthInputName:
          item["length"] = parseFloat(value);
          break;
        case this.distanceToNextFiberInputName:
          item["distanceToNextFiber"] = parseFloat(value);
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
}
