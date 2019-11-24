import { Injectable } from '@angular/core';
import { Print } from 'src/app/model/print/print';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Scaffold } from 'src/app/model/scaffold/scaffold';
import { Layer } from 'src/app/model/layer/layer';
import { MewData } from 'src/app/model/abstract/mew-data';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { takeUntil } from 'rxjs/operators';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';
import { Vector } from 'src/app/model/vector/vector';

// TODO: seperate into one service for each model
@Injectable({
  providedIn: 'root'
})
export class MewDataService {

  static instance: MewDataService;

  readonly printUrl: string = "http://mewscaffolds-api.herokuapp.com/print";
  readonly chartUrl: string = "http://mewscaffolds-api.herokuapp.com/chart";
  readonly chartCalculateEndpoint: string = "/calculate";
  readonly generateCodeEndpoint: string = "/generateCode";

  private unsubscribe: Subject<any>;
  private printSource: Subject<Print>;

  print$: Observable<Print>;
  print: Print;

  constructor(private httpClient: HttpClient, private textConfig: TextConfig, private settingsConfig: SettingsConfig) {
    MewDataService.instance = this;
    this.unsubscribe = new Subject<any>();
    this.printSource = new Subject<Print>();
    this.print$ = this.printSource.asObservable();
    this.print = null;
  }

  setObservedPrint(print: Print): Observable<Print> {
    this.print = print;
    this.print.isSelected = true;
    this.pushNextPrint(print);
    return this.print$;
  }

  pushNextPrint(print: Print): void {
    this.printSource.next(print);
  }

  fetchChartData(layers: Layer[]): Observable<[number, Vector[]]> {
    if (layers.length == 0) {
      this.print.children.filter(scaffold => scaffold.isSelected).forEach(scaffold => {
        scaffold.children.forEach(layer => {
          let copyLayer: Layer = layer as Layer;
          layers.push(copyLayer);
        });
      });
    }
    let serializedLayers: Object[] = [];
    layers.forEach(layer => {
      serializedLayers.push(this.serializeLayer(layer));
    });
    return this.httpClient.post<[number, Vector[]]>(this.chartUrl + this.chartCalculateEndpoint, serializedLayers).pipe(takeUntil(this.unsubscribe));
  }

  fetchGeneratedCode(): Observable<any> {
    let obj: any = {
      print: this.serializePrint(this.print),
      settings: this.serializeSettings(),
    }
    return this.httpClient.post<any>(this.printUrl + this.generateCodeEndpoint, obj).pipe(takeUntil(this.unsubscribe));
  }

  getScaffoldsOfPrint(print: Print): Scaffold[] {
    let scaffolds: Scaffold[] = [];
    scaffolds.push.apply(scaffolds, print.children);
    return scaffolds;
  }

  getLayersOfPrint(print: Print): Layer[] {
    let layers: Layer[] = [];
    this.getScaffoldsOfPrint(print).forEach(scaffold => {
      layers.push.apply(layers, scaffold.children);
    });
    return layers;
  }

  createPathOfMewData(data: MewData): string {
    let path: string = "";
    if (data.parent !== null) {
      path = data.parent.name + this.textConfig.pathSeperator;
      if (data.parent.path !== "") {
        path = data.parent.path + path;
      }
    }
    return path;
  }

  recalculatePathsRecursive(data: MewData): void {
    data.path = this.createPathOfMewData(data);
    if (data.children != null) {
      data.children.forEach(child => {
        this.recalculatePathsRecursive(child);
      });
    }
  }

  setMewDataIsSelectedRecursive(data: MewData, isSelected: boolean): void {
    data.isSelected = isSelected;
    if (data.children !== null) {
      data.children.forEach(child => this.setMewDataIsSelectedRecursive(child, isSelected));
    }
  }

  addChildToParent(child: MewData, parent: MewData): MewData {
    let addedChild: MewData = null;
    if (parent.children != null) {
      addedChild = this.detachChildFromParent(child);
      if (addedChild != null) {
        addedChild.parent = parent;
        parent.children.push(addedChild);
      }
    }
    return addedChild;
  }

  addNewChildToParent(parent: MewData): MewData {
    let newChild: MewData = null;
    if (parent.children !== null) {
      let id: number = this.getNextChildId(parent);
      let name: string = this.textConfig.suffixSeperator + this.getNextChildNameSuffix(parent);
      if (parent instanceof Print) {
        name = this.settingsConfig.defaultScaffoldName + name;
        newChild = new Scaffold(id, name, parent);
        newChild["position"]["x"] = this.settingsConfig.defaultScaffoldPositionX;
        newChild["position"]["y"] = this.settingsConfig.defaultScaffoldPositionY;
      }
      else if (parent instanceof Scaffold) {
        name = this.settingsConfig.defaultLayerName + name;
        newChild = new Layer(id, name, parent);
      }
      parent.children.push(newChild);
    }
    return newChild;
  }

  deepCopy(data: MewData, parent: MewData): MewData {
    let copy: MewData = null;
    let id: number = this.getNextChildId(parent);
    if (data instanceof Scaffold) {
      copy = new Scaffold(id, data.name, parent);
      copy["position"]["x"] = data["position"]["x"];
      copy["position"]["y"] = data["position"]["y"];
    }
    else if (data instanceof Layer) {
      copy = new Layer(id, data.name, parent);
      copy["angle"] = data["angle"];
      copy["fibers"] = data["fibers"];
      copy["width"] = data["width"];
      copy["height"] = data["height"];
      copy["distanceBetweenFibers"] = data["distanceBetweenFibers"];
      copy["isSinusoidal"] = data["isSinusoidal"];
      copy["amplitude"] = data["amplitude"];
      copy["phase"] = data["phase"];
      copy["phaseShift"] = data["phaseShift"];
      copy["temperature"] = data["temperature"];
      copy["pressure"] = data["pressure"];
      copy["speed"] = data["speed"];
      copy["loopSpeed"] = data["loopSpeed"];
      copy["loopRadius"] = data["loopRadius"];
      copy["waitIn"] = data["waitIn"];
      copy["waitOut"] = data["waitOut"];
      copy["zDistance"] = data["zDistance"];
    }
    if (data.children != null) {
      data.children.forEach(child => {
        copy.children.push(this.deepCopy(child, copy));
      });
    }
    return copy;
  }

  serializeLayer(layer: Layer): any {
    let result: any = {
      id: layer.id,
      name: layer.name,
      path: layer.path,
      children: [],
      angle: layer.angle,
      fibers: layer.fibers,
      width: layer.width,
      height: layer.height,
      distanceBetweenFibers: layer.distanceBetweenFibers,
      isSinusoidal: layer.isSinusoidal,
      amplitude: layer.amplitude,
      phase: layer.phase,
      phaseShift: layer.phaseShift,
      temperature: layer.temperature,
      pressure: layer.pressure,
      speed: layer.speed,
      loopSpeed: layer.loopSpeed,
      loopRadius: layer.loopRadius,
      waitIn: layer.waitIn,
      waitOut: layer.waitOut,
      distanceZ: layer.zDistance,
    }
    return result;
  }

  serializeScaffold(scaffold: Scaffold): any {
    let layers: any[] = [];
    scaffold.children.forEach(layer => {
      layers.push(this.serializeLayer(layer as Layer));
    });
    let result: any = {
      id: scaffold.id,
      name: scaffold.name,
      path: scaffold.path,
      isSelected: scaffold.isSelected,
      positionX: scaffold.position.x,
      positionY: scaffold.position.y,
      position: {x: scaffold.position.x, y: scaffold.position.y},
      children: layers,
    }
    return result;
  }

  serializePrint(print: Print): any {
    let scaffolds: any[] = [];
    print.children.forEach(scaffold => {
      scaffolds.push(this.serializeScaffold(scaffold as Scaffold));
    });
    let result: any = {
      id: print.id,
      name: print.name,
      path: print.path,
      children: scaffolds,
    }
    return result;
  }

  serializePrintForSaveFile(print: Print):any {
    let result: any = this.serializePrint(print);
    result.children.forEach(scaffold => {
      (scaffold as Scaffold).children.forEach(layer => {
        (layer as Layer).zDistance = layer["distanceZ"];
        delete layer["distanceZ"];
      });
    });
    return result;
  }

  serializeSettings(): any {
    let result: any = {};
    Object.entries(this.settingsConfig).forEach(entry => {
      if (entry[0] != "textConfig") {
        result[entry[0]] = entry[1];
      }
    });
    return result;
  }

  detachChildFromParent(child: MewData): MewData {
    let detachedChild: MewData = null;
    if (child.parent != null && child.parent.children != null) {
      let index: number = child.parent.children.findIndex(item => item.id == child.id);
      detachedChild = child.parent.children.splice(index, 1)[0];
      detachedChild.parent = null;
    }
    return detachedChild;
  }

  attachChildToParent(child: MewData, parent: MewData, index: number): MewData {
    if (child.parent != null) {
      child = this.detachChildFromParent(child);
    }
    if (child != null) {
      child.parent = parent;
      parent.children.splice(index, 0, child);
    }
    return child;
  }

  getChildIndex(child: MewData): number {
    let index: number = null;
    if (child.parent != null && child.parent.children != null) {
      index = child.parent.children.findIndex(item => item.id == child.id);
    }
    return index;
  }

  spliceChildToNeighbor(child: MewData, neighbor: MewData): MewData {
    if (neighbor.parent == null) return null;
    child = this.detachChildFromParent(child);
    let index: number = this.getChildIndex(neighbor);
    return this.attachChildToParent(child, neighbor.parent, index);
  }

  getRadiusOfScaffold(scaffold: Scaffold): number {
    let result: number = 0;
    scaffold.children.forEach(child => {
      let layer: Layer = child as Layer;
      let width: number = layer.width;
      let height: number = layer.height;
      let radius: number = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
      if (radius > result) result = radius;
    });
    return result;
  }

  getRadiusOfScaffoldAndNavigationArea(scaffold: Scaffold): number {
    let result: number = 0;
    scaffold.children.forEach(child => {
      let layer: Layer = child as Layer;
      let width: number = layer.width;
      let height: number = layer.height;
      let radius: number = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
      radius += layer.loopRadius;
      if (radius > result) result = radius;
    });
    return result;
  }

  calculateFibersOfLayer(layer: Layer): number {
    return Math.floor(layer.height / layer.distanceBetweenFibers) + 1;
  }

  initializeFetchedPrint(print: Print): Print {
    let newPrint: Print = new Print(print.id, print.name);
    print.children.forEach(scaffold => {
      let newScaffold: Scaffold = new Scaffold(scaffold.id, scaffold.name, newPrint);
      newScaffold.position = new Vector(scaffold["positionX"], scaffold["positionY"]);
      scaffold.children.forEach(layer => {
        let newLayer: Layer = new Layer(layer.id, layer.name, newScaffold);
        newLayer.angle = layer["angle"];
        newLayer.isSinusoidal = layer["isSinusoidal"];
        newLayer.amplitude = layer["amplitude"];
        newLayer.phase = layer["phase"];
        newLayer.phaseShift = layer["phaseShift"];
        newLayer.temperature = layer["temperature"];
        newLayer.pressure = layer["pressure"];
        newLayer.speed = layer["speed"];
        newLayer.loopSpeed = layer["loopSpeed"];
        newLayer.loopRadius = layer["loopRadius"];
        newLayer.waitIn = layer["waitIn"];
        newLayer.waitOut = layer["waitOut"];
        newLayer.zDistance = layer["zDistance"];
        newScaffold.children.push(newLayer);
      });
      newPrint.children.push(newScaffold);
    });
    return newPrint;
  }

  setParents(print: Print): void {
    print.children.forEach(scaffold => {
      scaffold.parent = print;
      scaffold.children.forEach(layer => {
        layer.parent = scaffold;
      });
    });
  }

  private getNextChildNameSuffix(parent: MewData): string {
    let smallestUnused: number = null;
    if (parent.children != null) {
      smallestUnused = 1;
      let array: number[] = parent.children.map(child => {
        return parseInt(child.name.split(this.textConfig.suffixSeperator).pop(), 10);
      });
      array.filter(number => !isNaN(number)).sort((a, b) => a - b).forEach(number => {
        if (number <= smallestUnused) smallestUnused++;
      });
    }
    return smallestUnused.toString();
  }

  private getNextChildId(parent: MewData): number {
    let smallestUnused: number = null;
    if (parent.children != null) {
      smallestUnused = 1;
      let array: number[] = parent.children.map(child => {
        return child.id;
      });
      array.sort((a, b) => a - b).forEach(number => {
        if (number <= smallestUnused) smallestUnused++;
      });
    }
    return smallestUnused;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
