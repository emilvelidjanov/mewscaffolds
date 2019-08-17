export abstract class TokenListData {

    id: number;
    name: string;
    children: TokenListData[];
    isSelected: boolean;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.children = [];
        this.isSelected = false;
    }
}
