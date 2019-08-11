import { Layer } from '../layer/layer';
import { TokenListData } from 'src/app/interface/token-list-data/token-list-data';

export class Scaffold implements TokenListData {
    
    id: number;
    name: string;

    layers: Layer[];

    constructor(id: number, name: string, layers: Layer[]) {
        this.id = id;
        this.name = name;
        this.layers = layers;
    }
}
