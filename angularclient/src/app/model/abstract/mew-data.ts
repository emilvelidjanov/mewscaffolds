import { TextConfig } from 'src/app/config/text-config/text-config';

export abstract class MEWData {

    id: number;
    name: string;
    path: string;
    children: MEWData[];
    parent: MEWData;
    isSelected: boolean;
    markedForDeletion: boolean;
    
    constructor(id: number, name: string, children: MEWData[], parent: MEWData) {
        this.id = id;
        this.name = name;
        this.children = children;
        this.parent = parent;
        this.isSelected = false;
        this.markedForDeletion = false;
        this.path = "";
        if (this.parent != null) {
            this.path = this.parent.name + TextConfig.instance.pathSeperator;
            if (this.parent.path !== "") {
                this.path = this.parent.path + this.path;
            }
        }
    }
}
