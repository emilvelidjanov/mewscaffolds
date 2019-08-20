import { Scaffold } from '../scaffold/scaffold';
import { MEWData } from '../abstract/mew-data';

export class Print extends MEWData {

    constructor(id: number, name: string) {
        super(id, name, [], null);
    }
}
