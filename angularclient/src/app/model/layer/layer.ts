import { MewData } from '../abstract/mew-data';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';

export class Layer extends MewData {
    
    fibers: number;
    angle: number;
    width: number;
    height: number;
    distanceBetweenFibers: number;

    speed: number;
    loopSpeed: number;
    loopRadius: number;
    waitIn: number;
    waitOut: number;
    zDistance: number;
    angleIncrement: number;
    distanceBetweenFibersIncrement: number;
    
    isSinusoidal: boolean;
    amplitude: number;
    phase: number;
    phaseShift: number;

    constructor(id: number, name: string, parent: MewData) {
        super(id, name, null, parent);
        this.angle = SettingsConfig.instance.defaultLayerAngle;
        this.width = SettingsConfig.instance.defaultLayerWidth;
        this.height = SettingsConfig.instance.defaultLayerHeight;
        this.distanceBetweenFibers = SettingsConfig.instance.defaultDistanceBetweenFibers;
        this.fibers = Math.floor(this.height / this.distanceBetweenFibers) + 1;

        this.speed = SettingsConfig.instance.defaultLayerSpeed;
        this.loopSpeed = SettingsConfig.instance.defaultLayerLoopSpeed;
        this.loopRadius = SettingsConfig.instance.defaultLayerLoopRadius;
        this.waitIn = SettingsConfig.instance.defaultLayerWaitIn;
        this.waitOut = SettingsConfig.instance.defaultLayerWaitOut;
        this.zDistance = SettingsConfig.instance.defaultLayerZDistance;
        this.angleIncrement = SettingsConfig.instance.defaultLayerAngleIncrement;
        this.distanceBetweenFibersIncrement = SettingsConfig.instance.defaultLayerDistanceBetweenFibersIncrement;

        this.isSinusoidal = SettingsConfig.instance.defaultLayerIsSinusoidal;
        this.amplitude = SettingsConfig.instance.defaultLayerAmplitude;
        this.phase = SettingsConfig.instance.defaultLayerPhase;
        this.phaseShift = SettingsConfig.instance.defaultLayerPhaseShift;
    }
}
