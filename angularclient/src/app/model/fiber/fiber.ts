import { MEWData } from '../abstract/mew-data';

export class Fiber extends MEWData {
    
    constructor(id: number, name: string, parent: MEWData) {
        super(id, name, null, parent);
    }
}
