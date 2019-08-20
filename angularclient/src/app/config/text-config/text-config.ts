import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextConfig {

    static instance: TextConfig;

    constructor() {
        TextConfig.instance = this;
    }

    readonly appTitle: string = "MEW Scaffolds";
    readonly scaffold: string = "Scaffold";
    readonly layer: string = "Layer";
    readonly fiber: string = "Fiber";
    readonly pathSeperator: string = " > "

    readonly scaffoldControlLabel: string = "Scaffold control"
    readonly layerControlLabel: string = "Layer control"
    readonly fiberControlLabel: string = "Fiber control"

    readonly collapseButtonTextClose: string = "Close";
    readonly collapseButtonTextOpen: string = "Open";
    readonly addButtonText: string = "Add";
    readonly selectAllButtonText: string = "Select all";
    readonly selectNoneButtonText: string = "Select none";
    readonly removeButtonText: string = "Remove";
    readonly cdkDragPlaceholderText: string = "Drop here...";
}
