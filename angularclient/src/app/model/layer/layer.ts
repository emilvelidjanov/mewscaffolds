import { Fiber } from '../fiber/fiber';
import { MEWData } from '../abstract/mew-data';

export class Layer extends MEWData {
    
    constructor(id: number, name: string, parent: MEWData) {
        super(id, name, [], parent);
    }
}
