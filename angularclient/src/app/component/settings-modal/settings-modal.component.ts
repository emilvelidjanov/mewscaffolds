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

  readonly nameMultiSelectOn: string = "multiSelectOn";

  constructor(private textConfig: TextConfig, private settingsConfig: SettingsConfig, private cookieService: CookieService) { }

  ngOnInit() {
    this.settingsConfig.multiSelectOn = Boolean(JSON.parse(this.cookieService.get(this.nameMultiSelectOn)));
  }

  // TODO: save settings as cookie
  onInput(name: string, value: string) {
    switch (name) {
      case this.nameMultiSelectOn:
        this.settingsConfig.multiSelectOn = Boolean(JSON.parse(value));
        break;
    }
    this.cookieService.set(this.nameMultiSelectOn, JSON.stringify(this.settingsConfig.multiSelectOn));
  }

}
