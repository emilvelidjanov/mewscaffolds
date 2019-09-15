import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsConfig {

    multiSelectOn: boolean;

    constructor() {
        this.multiSelectOn = false;
    }
}
