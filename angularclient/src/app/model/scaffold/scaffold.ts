import { Layer } from '../layer/layer';
import { TokenListData } from '../abstract/token-list-data';

export class Scaffold extends TokenListData {

    constructor(id: number, name: string, children: Layer[]) {
        super(id, name);
        this.children = children;
    }
}
