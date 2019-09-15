import { MewData } from '../abstract/mew-data';
import { Vector } from '../vector/vector';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';

export class Scaffold extends MewData {

    position: Vector;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, [], parent);
        let x: number = SettingsConfig.instance.defaultScaffoldPositionX;
        let y: number = SettingsConfig.instance.defaultScaffoldPositionY;
        this.position = new Vector(x, y);
    }
}
