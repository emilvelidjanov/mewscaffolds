import { Fiber } from '../fiber/fiber';
import { MewData } from '../abstract/mew-data';

export class Layer extends MewData {
    
    constructor(id: number, name: string, parent: MewData) {
        super(id, name, [], parent);
    }
}
