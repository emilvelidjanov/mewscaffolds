import { MewData } from '../abstract/mew-data';
import { Vector } from '../vector/vector';

export class Scaffold extends MewData {

    position: Vector;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, [], parent);
        this.position = new Vector(0, 0);
    }
}
