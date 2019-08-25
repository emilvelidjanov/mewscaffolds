import { MewData } from '../abstract/mew-data';

export class Fiber extends MewData {
    
    constructor(id: number, name: string, parent: MewData) {
        super(id, name, null, parent);
    }
}
