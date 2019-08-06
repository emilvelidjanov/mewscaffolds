export class Token {

    id: number;
    name: string;

    isSelected: boolean;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.isSelected = false;
    }
}
