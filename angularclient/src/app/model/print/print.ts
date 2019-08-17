import { Scaffold } from '../scaffold/scaffold';
import { TokenListData } from '../abstract/token-list-data';

export class Print extends TokenListData {

    constructor(id: number, name: string, children: Scaffold[]) {
        super(id, name);
        this.children = children;
    }
}
