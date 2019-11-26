import { MewData } from '../abstract/mew-data';
import { Vector } from '../vector/vector';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';
import { MewDataColor } from 'src/app/enum/mew-data-color';

export class Scaffold extends MewData {

    position: Vector;
    color: string;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, [], parent);
        let x: number = SettingsConfig.instance.defaultScaffoldPositionX;
        let y: number = SettingsConfig.instance.defaultScaffoldPositionY;
        this.position = new Vector(x, y);
        this.color = SettingsConfig.instance.defaultScaffoldColor;
    }
}
