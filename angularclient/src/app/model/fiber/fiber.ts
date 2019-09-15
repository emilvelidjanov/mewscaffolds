import { MewData } from '../abstract/mew-data';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';

export class Fiber extends MewData {
    
    length: number;
    distanceToNextFiber: number;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, null, parent);
        this.length = SettingsConfig.instance.defaultFiberLength;
        this.distanceToNextFiber = SettingsConfig.instance.defaultFiberDistanceToNextFiber;
    }
}
