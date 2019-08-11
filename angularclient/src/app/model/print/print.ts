import { TokenListData } from 'src/app/interface/token-list-data/token-list-data';
import { Scaffold } from '../scaffold/scaffold';

export class Print implements TokenListData{

    id: number;
    name: string;

    scaffolds: Scaffold[];

    constructor(name: string, scaffolds: Scaffold[]) {
        this.name = name;
        this.scaffolds = scaffolds;
    }
}
