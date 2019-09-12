import { Injectable } from '@angular/core';
import { Print } from 'src/app/model/print/print';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Scaffold } from 'src/app/model/scaffold/scaffold';
import { Layer } from 'src/app/model/layer/layer';
import { Fiber } from 'src/app/model/fiber/fiber';
import { MewData } from 'src/app/model/abstract/mew-data';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { takeUntil } from 'rxjs/operators';
import { Vector } from 'src/app/model/vector/vector';
import { create } from 'domain';

// TODO: seperate into one service for each model
@Injectable({
  providedIn: 'root'
})
export class MewDataService {

  static instance: MewDataService;

  readonly baseUrl: string = "http://localhost:8080/print/";

  private unsubscribe: Subject<any>;
  private printSource: Subject<Print>;

  print$: Observable<Print>;
  print: Print;

  private math;

  constructor(private httpClient: HttpClient, private textConfig: TextConfig) {
    MewDataService.instance = this;
    this.unsubscribe = new Subject<any>();
    this.printSource = new Subject<Print>();
    this.print$ = this.printSource.asObservable();
    this.print = null;
    this.math = require('mathjs');
  }

  fetchPrintById(id: number): Observable<Print> {
    this.httpClient.get<Print>(this.baseUrl + id).pipe(takeUntil(this.unsubscribe)).subscribe(print => {
      if (print) {
        this.print = this.initializeFetchedPrint(print);
      }
      else {
        this.print = null;
      }
      this.pushNextPrint(this.print);
    }, error => {
      this.print = null;
      this.pushNextPrint(this.print);
    });
    return this.print$;
  }

  pushNextPrint(print: Print): void {
    this.printSource.next(print);
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

  getFibersOfPrint(print: Print): Fiber[] {
    let fibers: Fiber[] = [];
    this.getLayersOfPrint(print).forEach(layer => {
      fibers.push.apply(fibers, layer.children);
    });
    return fibers;
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

  setMewDataIsPersistedRecursive(data: MewData, isPersisted: boolean): void {
    data.isPersisted = isPersisted;
    if (data.children !== null) {
      data.children.forEach(child => this.setMewDataIsPersistedRecursive(child, isPersisted));
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
        name = this.textConfig.scaffold + name;
        newChild = new Scaffold(id, name, parent);
      }
      else if (parent instanceof Scaffold) {
        name = this.textConfig.layer + name;
        newChild = new Layer(id, name, parent);
      }
      else if (parent instanceof Layer) {
        name = this.textConfig.fiber + name;
        newChild = new Fiber(id, name, parent);
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
    }
    else if (data instanceof Layer) {
      copy = new Layer(id, data.name, parent);
    }
    else if (data instanceof Fiber) {
      copy = new Fiber(id, data.name, parent);
    }
    if (data.children != null) {
      data.children.forEach(child => {
        copy.children.push(this.deepCopy(child, copy));
      });
    }
    return copy;
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

  private initializeFetchedPrint(print: Print): Print {
    let newPrint: Print = new Print(print.id, print.name);
    newPrint.isPersisted = true;
    print.children.forEach(scaffold => {
      let newScaffold: Scaffold = new Scaffold(scaffold.id, scaffold.name, newPrint);
      newScaffold.isPersisted = true;
      scaffold.children.forEach(layer => {
        let newLayer: Layer = new Layer(layer.id, layer.name, newScaffold);
        newLayer.isPersisted = true;
        layer.children.forEach(fiber => {
          let newFiber: Fiber = new Fiber(fiber.id, fiber.name, newLayer);
          newFiber.isPersisted = true;
          newLayer.children.push(newFiber);
        });
        newScaffold.children.push(newLayer);
      });
      newPrint.children.push(newScaffold);
    });
    return newPrint;
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
