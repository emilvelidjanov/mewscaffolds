import { Component, OnInit } from '@angular/core';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent implements OnInit {

  readonly settingsCookieName: string = "settings";

  readonly nameMultiSelectOn: string = "multiSelectOn";
  readonly nameAdvancedModeOn: string = "advancedModeOn";
  readonly nameSlideWidth: string = "slideWidth";
  readonly nameSlideHeight: string = "slideHeight";
  readonly namePrintAreaBottomLeftX: string = "printAreaBottomLeftX";
  readonly namePrintAreaBottomLeftY: string = "printAreaBottomLeftY";
  readonly namePrintAreaTopRightX: string = "printAreaTopRightX";
  readonly namePrintAreaTopRightY: string = "printAreaTopRightY";
  readonly nameDefaultScaffoldName: string = "defaultScaffoldName";
  readonly nameDefaultScaffoldPositionX: string = "defaultScaffoldPositionX";
  readonly nameDefaultScaffoldPositionY: string = "defaultScaffoldPositionY";
  readonly nameDefaultLayerName: string = "defaultLayerName";
  readonly nameDefaultLayerWidth: string = "defaultLayerWidth";
  readonly nameDefaultLayerHeight: string = "defaultLayerHeight";
  readonly nameDefaultDistanceBetweenFibers: string = "defaultDistanceBetweenFibers";
  readonly nameDefaultLayerAngle: string = "defaultLayerAngle";
    
  readonly nameDefaultLayerIsSinusoidal: string = "defaultLayerIsSinusoidal";
  readonly nameDefaultLayerAmplitude: string = "defaultLayerAmplitude";
  readonly nameDefaultLayerPhase: string = "defaultLayerPhase";
  readonly nameDefaultLayerPhaseShift: string = "defaultLayerPhaseShift";

  readonly nameDefaultLayerTemperature: string = "defaultLayerTemperature";
  readonly nameDefaultLayerPressure: string = "defaultLayerPressure";
  readonly nameDefaultLayerSpeed: string = "defaultLayerSpeed";
  readonly nameDefaultLayerLoopSpeed: string = "defaultLayerLoopSpeed";
  readonly nameDefaultLayerLoopRadius: string = "defaultLayerLoopRadius";
  readonly nameDefaultLayerWaitIn: string = "defaultLayerWaitIn";
  readonly nameDefaultLayerWaitOut: string = "defaultLayerWaitOut";
  readonly nameDefaultLayerZDistance: string = "defaultLayerZDistance";

  constructor(public textConfig: TextConfig, public settingsConfig: SettingsConfig, private cookieService: CookieService) { }

  ngOnInit() {
    let settingsCookie: string = this.cookieService.get(this.settingsCookieName);
    if (settingsCookie) {
      let entries: [string, any][] = JSON.parse(settingsCookie);
      entries.forEach(entry => {
        this.settingsConfig[entry[0]] = entry[1];
      });
    }
  }

  onInput(name: string, value: string): void {
    switch (name) {
      case this.nameMultiSelectOn:
      case this.nameAdvancedModeOn:
      case this.nameDefaultLayerIsSinusoidal:
        this.settingsConfig[name] = Boolean(value);
        break;
      case this.nameDefaultScaffoldName:
      case this.nameDefaultLayerName:
        this.settingsConfig[name] = String(value);
        break;
      default:
        this.settingsConfig[name] = Number(value);
        break;
    }
  }

  saveSettingsAsCookie(): void {
    let entries: [string, any][] = Object.entries(this.settingsConfig);
    entries = entries.filter(entry => entry[0] != "textConfig");
    this.cookieService.set(this.settingsCookieName, JSON.stringify(entries), 365);
  }
}
