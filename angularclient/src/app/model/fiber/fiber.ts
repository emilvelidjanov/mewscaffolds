import { TokenListData } from 'src/app/interface/token-list-data/token-list-data';

export class Fiber implements TokenListData {

    id: number;
    name: string;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
