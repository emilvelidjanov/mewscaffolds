import { Fiber } from '../fiber/fiber';
import { TokenListData } from '../abstract/token-list-data';

export class Layer extends TokenListData {
    
    constructor(id: number, name: string, children: Fiber[]) {
        super(id, name);
        this.children = children;
    }
}
