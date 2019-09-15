import { MewData } from '../abstract/mew-data';
import { Fiber } from '../fiber/fiber';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';

export class Layer extends MewData {
    
    angle: number;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, <Fiber[]>[], parent);
        this.angle = SettingsConfig.instance.defaultLayerAngle;
    }
}
