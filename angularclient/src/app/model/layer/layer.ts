import { MewData } from '../abstract/mew-data';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';

export class Layer extends MewData {
    
    fibers: number;
    angle: number;
    width: number;
    height: number;
    distanceBetweenFibers: number;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, null, parent);
        this.angle = SettingsConfig.instance.defaultLayerAngle;
        this.width = SettingsConfig.instance.defaultLayerWidth;
        this.height = SettingsConfig.instance.defaultLayerHeight;
        this.distanceBetweenFibers = SettingsConfig.instance.defaultDistanceBetweenFibers;
        this.fibers = Math.floor(this.height / this.distanceBetweenFibers) + 1;
    }
}
