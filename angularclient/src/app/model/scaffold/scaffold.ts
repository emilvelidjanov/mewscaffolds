import { Layer } from '../layer/layer';
import { MEWData } from '../abstract/mew-data';

export class Scaffold extends MEWData {

    constructor(id: number, name: string, parent: MEWData) {
        super(id, name, [], parent);
    }
}
