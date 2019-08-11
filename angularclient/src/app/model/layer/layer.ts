import { Fiber } from '../fiber/fiber';
import { TokenListData } from 'src/app/interface/token-list-data/token-list-data';

export class Layer implements TokenListData {
    
    id: number;
    name: string;
    
    fibers: Fiber[];
    
    constructor(id: number, name: string, fibers: Fiber[]) {
        this.id = id;
        this.name = name;
        this.fibers = fibers;
    }
}
