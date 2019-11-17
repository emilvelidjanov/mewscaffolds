package com.velidjanov.mew.mewscaffolds.entity;

import lombok.*;

@NoArgsConstructor @Getter @Setter @ToString
public class Settings {

    private Double printAreaBottomLeftX;
    private Double printAreaBottomLeftY;
    private Double printAreaTopRightX;
    private Double printAreaTopRightY;

    private String defaultScaffoldName;
    private Double defaultScaffoldPositionX;
    private Double defaultScaffoldPositionY;

    private String defaultLayerName;
    private Double defaultLayerAngle;
    private Double defaultLayerWidth;
    private Double defaultLayerHeight;
    private Double defaultDistanceBetweenFibers;

    private Double slideWidth;
    private Double slideHeight;

    private Double defaultLayerSpeed;
    private Double defaultLayerPressure;
    private Double defaultLayerTemperature;
    private Double defaultLayerLoopSpeed;
    private Double defaultLayerLoopRadius;
    private Double defaultLayerWaitIn;
    private Double defaultLayerWaitOut;
    private Double defaultLayerZDistance;

    private Boolean defaultLayerIsSinusoidal;
    private Double defaultLayerAmplitude;
    private Double defaultLayerPhase;
    private Double defaultLayerPhaseShift;
}
