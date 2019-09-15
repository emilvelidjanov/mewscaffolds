import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TextConfig {

    static instance: TextConfig;
    
    constructor() {
        TextConfig.instance = this;
    }
    
    // General
    readonly appTitle: string = "MEW Scaffolds";
    readonly print: string = "Print";
    readonly scaffold: string = "Scaffold";
    readonly layer: string = "Layer";
    readonly fiber: string = "Fiber";
    readonly pathSeperator: string = " > ";
    readonly suffixSeperator: string = " ";
    
    // Control
    readonly controlLabel: string = "control";
    
    // Form
    readonly formLabel: string = "parameters";
    readonly nameInputLabel: string = "Name";
    readonly nameInputPlaceholder: string = "Name";
    readonly positionXInputLabel: string = "Position X";
    readonly positionYInputLabel: string = "Position Y";
    readonly positionXInputPlaceholder: string = "X";
    readonly positionYInputPlaceholder: string = "Y";
    readonly angleInputLabel: string = "Angle";
    readonly angleInputPlaceholder: string = "Angle";
    readonly lengthInputLabel: string = "Length";
    readonly lengthInputPlaceholder: string = "Length";
    readonly distanceToNextFiberInputLabel: string = "Distance to next fiber";
    readonly distanceToNextFiberInputPlaceholder: string = "Distance";
    readonly multiplePlaceholder: string = "Multiple..."

    // Chart
    readonly chartTitle: string = "chart";

    // Buttons
    readonly collapseButtonTextClose: string = "Close";
    readonly collapseButtonTextOpen: string = "Open";
    readonly addButtonText: string = "Add";
    readonly cloneButtonText: string = "Clone";
    readonly selectAllButtonText: string = "Select all";
    readonly selectNoneButtonText: string = "Select none";
    readonly removeButtonText: string = "Remove";
    readonly saveButtonText: string = "Save";
    readonly cancelButtonText: string = "Cancel";
    readonly settingsButtonText: string = "Settings";
    readonly refreshButtonText: string = "Refresh";

    // Drag & Drop
    readonly cdkDragPlaceholderText: string = "Move here...";
}
