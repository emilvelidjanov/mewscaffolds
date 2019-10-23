import { Component, OnInit, Input } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { Scaffold } from 'src/app/model/scaffold/scaffold';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';

@Component({
  selector: 'app-scaffold-positioning',
  templateUrl: './scaffold-positioning.component.html',
  styleUrls: ['./scaffold-positioning.component.scss']
})
export class ScaffoldPositioningComponent implements OnInit {

  readonly sizeModifier: number = 2.8;

  @Input() data: Scaffold[];

  positionBoundaryStyle: any;

  constructor(private textConfig: TextConfig, private settingsConfig: SettingsConfig) { 
    this.data = [];
    this.positionBoundaryStyle = {};
  }

  ngOnChanges() {
    let TRX: number = Math.abs(this.settingsConfig.printAreaTopRightX);
    let BLX: number = Math.abs(this.settingsConfig.printAreaBottomLeftX);
    let TRY: number = Math.abs(this.settingsConfig.printAreaTopRightY);
    let BLY: number = Math.abs(this.settingsConfig.printAreaBottomLeftY);

    let height: number = Math.abs(TRX - BLX) * this.sizeModifier;
    let width: number = Math.abs(TRY - BLY) * this.sizeModifier;
    this.positionBoundaryStyle = {
      width: width.toString() + "px",
      height: height.toString() + "px"
    }
  }

  ngOnInit() {
  }

  getScaffoldStyle(scaffold: Scaffold): any {
    // TODO
  }
}
