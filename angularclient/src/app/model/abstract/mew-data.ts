import { TextConfig } from 'src/app/config/text-config/text-config';

// TODO: cleanup children and parent type mistakes
export abstract class MewData {

    id: number;
    name: string;
    path: string;
    children: MewData[];
    parent: MewData;
    isSelected: boolean;
    
    constructor(id: number, name: string, children: MewData[], parent: MewData) {
        this.id = id;
        this.name = name;
        this.children = children;
        this.parent = parent;
        this.isSelected = false;
        this.path = "";
        if (parent != null) {
            this.path = parent.name + TextConfig.instance.pathSeperator;
            if (parent.path !== "") {
              this.path = parent.path + this.path;
            }
        }
    }
}
