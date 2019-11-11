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
    readonly widthInputLabel: string = "Width";
    readonly widthInputPlaceholder: string = "Width";
    readonly heightInputLabel: string = "Height";
    readonly heightInputPlaceholder: string = "Height";
    readonly fibersInputLabel: string = "Number of fibers"
    readonly fibersInputPlaceholder: string = "Number of fibers";
    readonly distanceBetweenFibersInputLabel: string = "Distance between fibers";
    readonly distanceBetweenFibersInputPlaceholder: string = "Distance between fibers";
    readonly multiplePlaceholder: string = "Multiple..."
    readonly formPleaseSelectText: string = "Please select a";
    readonly speedInputLabel: string = "Speed";
    readonly speedInputPlaceholder: string = "Speed";
    readonly temperatureInputLabel: string = "Temperature";
    readonly temperatureInputPlaceholder: string = "Temperature";
    readonly pressureInputLabel: string = "Pressure";
    readonly pressureInputPlaceholder: string = "Pressure";
    readonly loopSpeedInputLabel: string = "Loop speed";
    readonly loopSpeedInputPlaceholder: string = "Loop speed";
    readonly loopRadiusInputLabel: string = "Loop radius";
    readonly loopRadiusInputPlaceholder: string = "Loop radius";
    readonly waitInInputLabel: string = "Wait-in time";
    readonly waitInInputPlaceholder: string = "Wait-in time";
    readonly waitOutInputLabel: string = "Wait-out time";
    readonly waitOutInputPlaceholder: string = "Wait-out time";
    readonly zDistanceInputLabel: string = "Z-distance";
    readonly zDistanceInputPlaceholder: string = "Z-distance";
    readonly distanceBetweenFibersIncrementInputLabel: string = "Distance to next fiber increment";
    readonly distanceBetweenFibersIncrementInputPlaceholder: string = "Distance to next fiber increment";
    readonly isSinusoidalInputLabel: string = "Sinusoidal";
    readonly amplitudeInputLabel: string = "Amplitude";
    readonly amplitudeInputPlaceholder: string = "Amplitude";
    readonly phaseInputLabel: string = "Phase";
    readonly phaseInputPlaceholder: string = "Phase";
    readonly phaseShiftInputLabel: string = "Phase shift";
    readonly phaseShiftInputPlaceholder: string = "Phase shift";

    // Chart
    readonly chartTitle: string = "chart";

    // Positioning component
    readonly positioningTitle: string = "positions"

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
    readonly loadButtonText: string = "Load";
    readonly generateCodeButtonText: string = "Generate code";

    // Settings Modal
    readonly settingsTitle: string = "Settings";
    readonly settingsClose: string = "Close";
    readonly settingsSave: string = "Save";
    readonly settingsUserInterfaceLabel: string = "User interface";
    readonly settingsMultiSelectLabel: string = "Multi-select enabled";
    readonly settingsAdvancedModeLabel: string = "Advanced mode enabled";
    readonly settingsSlideWidthLabel: string = "Slide width";
    readonly settingsSlideHeightLabel: string = "Slide height";
    readonly settingsPrintAreaLabel: string = "Print area coordinates";
    readonly settingsPrintAreaBottomLeftXLabel: string = "Bottom-left corner X";
    readonly settingsPrintAreaBottomLeftYLabel: string = "Bottom-left corner Y";
    readonly settingsPrintAreaTopRightXLabel: string = "Top-right corner X";
    readonly settingsPrintAreaTopRightYLabel: string = "Top-right corner Y";
    readonly settingsDataDefaultsLabel: string = "Data defaults";
    readonly settingsDefaultScaffoldNameLabel: string = "Name";
    readonly settingsDefaultScaffoldPositionX: string = "Position X";
    readonly settingsDefaultScaffoldPositionY: string = "Position Y";
    readonly settingsDefaultLayerNameLabel: string = "Name";
    readonly settingsDefaultLayerWidthLabel: string = "Width";
    readonly settingsDefaultLayerHeightLabel: string = "Height";
    readonly settingsDefaultDistanceBetweenFibersLabel: string = "Distance between fibers";
    readonly settingsDefaultLayerAngleLabel: string = "Angle";
    readonly settingsSavedSuccessfullyMessage: string = "Saved settings in your browser.";

    // Load modal
    readonly loadTitle: string = "Load settings from file";

    // Generate code modal
    readonly generateCodeModalTitle: string = "Generate code";

    // Drag & Drop
    readonly cdkDragPlaceholderText: string = "Move here...";
}
