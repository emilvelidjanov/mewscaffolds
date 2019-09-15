import { MewData } from '../abstract/mew-data';

export class Fiber extends MewData {
    
    length: number;
    distanceToNextFiber: number;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, null, parent);
        this.length = 15;
        this.distanceToNextFiber = 0.5;
    }
}
