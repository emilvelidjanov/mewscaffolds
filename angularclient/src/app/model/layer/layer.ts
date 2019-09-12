import { MewData } from '../abstract/mew-data';
import { Fiber } from '../fiber/fiber';

export class Layer extends MewData {
    
    angle: number;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, <Fiber[]>[], parent);
        this.angle = 0;
    }
}
