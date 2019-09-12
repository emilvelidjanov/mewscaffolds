import { MewData } from '../abstract/mew-data';

export class Print extends MewData {

    constructor(id: number, name: string) {
        super(id, name, [], null);
    }
}
