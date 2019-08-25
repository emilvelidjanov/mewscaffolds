import { Layer } from '../layer/layer';
import { MewData } from '../abstract/mew-data';

export class Scaffold extends MewData {

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, [], parent);
    }
}
