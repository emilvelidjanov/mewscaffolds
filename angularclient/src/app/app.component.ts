import { Component, OnInit } from '@angular/core';
import { PrintService } from './service/print-service/print.service';
import { Layer } from './model/layer/layer';
import { Scaffold } from './model/scaffold/scaffold';
import { Fiber } from './model/fiber/fiber';
import { Print } from './model/print/print';
import { MEWData } from './model/abstract/mew-data';
import { TextConfig } from './config/text-config/text-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  print: Print;
  shownScaffolds: Scaffold[];
  selectedScaffoldsTotal: number;
  shownLayers: Layer[];
  selectedLayersTotal: number;
  shownFibers: Fiber[];
  selectedFibersTotal: number;
  
  constructor(private printService: PrintService, private textConfig: TextConfig) { }

  ngOnInit(): void {
    this.printService.getById(1).subscribe(print => {
      this.initializeThisPrint(print);
      this.shownScaffolds = this.print.children;
      console.log(this.print);
    });
    this.shownLayers = [];
    this.shownFibers = [];
    this.selectedScaffoldsTotal = 0;
    this.selectedLayersTotal = 0;
    this.selectedFibersTotal = 0;
  }

  // TODO: merge with onXChanged
  onScaffoldSelected(scaffolds: Scaffold[]): void {
    this.shownLayers = [];
    scaffolds.forEach(scaffold => {
      if (scaffold.isSelected) {
        this.shownLayers.push.apply(this.shownLayers, scaffold.children);
      }
      else {
        this.removeSelectionOfChildrenRecursive(scaffold);
      }
    });
    this.recalculateSelectedMEWData();
  }

  onLayerSelected(layers: Layer[]): void {
    this.shownFibers = [];
    layers.forEach(layer => {
      if (layer.isSelected) {
        this.shownFibers.push.apply(this.shownFibers, layer.children);
      }
      else {
        this.removeSelectionOfChildrenRecursive(layer);
      }
    });
    this.recalculateSelectedMEWData();
  }

  onFiberSelected(fibers: Fiber[]): void {
    this.recalculateSelectedMEWData();
  }

  onScaffoldChanged(scaffolds: Scaffold[]): void {
    let toDelete: Scaffold[] = scaffolds.filter(scaffold => scaffold.markedForDeletion);
    if (toDelete.length > 0) {
      this.shownLayers = [];
      this.shownFibers = [];
    }
    this.print.children = scaffolds.filter(scaffold => !scaffold.markedForDeletion);
    this.shownScaffolds = this.print.children;
  }

  // TODO: cleanup and maybe optimize?
  onLayerChanged(layers: Layer[]): void {
    let toDelete: Layer[] = layers.filter(layer => layer.markedForDeletion);
    if (toDelete.length > 0) {
      toDelete.forEach(layer => {
        this.removeElementFromArray(layers, layer);
        this.removeElementFromArray(this.shownLayers, layer);
        this.removeElementFromArray(layer.parent.children, layer);
        this.removeSelectionOfChildrenRecursive(layer);
      });
    }
    this.print.children.forEach(scaffold => {
      let changes: Layer[] = layers.filter(layer => layer.parent.id == scaffold.id);
      if (changes.length > 0) scaffold.children = changes;
    });
  }

  onFiberChanged(fibers: Fiber[]): void {
    let toDelete: Fiber[] = fibers.filter(fiber => fiber.markedForDeletion);
    if (toDelete.length > 0) {
      toDelete.forEach(fiber => {
        this.removeElementFromArray(fibers, fiber);
        this.removeElementFromArray(this.shownFibers, fiber);
        this.removeElementFromArray(fiber.parent.children, fiber);
        this.removeSelectionOfChildrenRecursive(fiber);
      });
    }
    this.print.children.forEach(scaffold => {
      scaffold.children.forEach(layer => {
        let changes: Fiber[] = fibers.filter(fiber => fiber.parent.id == layer.id);
        if (changes.length > 0) layer.children = changes;
      });
    });
  }
  
  private removeSelectionOfChildrenRecursive(tokenListData: MEWData): void {
    if (tokenListData.children != null) {
      tokenListData.children.forEach(child => {
        child.isSelected = false;
        if (child instanceof Layer) {
          this.removeElementFromArray(this.shownLayers, child);
        }
        else if (child instanceof Fiber) {
          this.removeElementFromArray(this.shownFibers, child);
        }
        this.removeSelectionOfChildrenRecursive(child);
      });
    }
    else {
      tokenListData.isSelected = false;
      this.removeElementFromArray(this.shownFibers, tokenListData);
    }
  }

  private initializeThisPrint(print: Print): void {
    this.print = new Print(print.id, print.name);
    this.print.isSelected = true;
    print.children.forEach(scaffold => {
      let newScaffold: Scaffold = new Scaffold(scaffold.id, scaffold.name, this.print);
      scaffold.children.forEach(layer => {
        let newLayer: Layer = new Layer(layer.id, layer.name, newScaffold);
        layer.children.forEach(fiber => {
          let newFiber: Fiber = new Fiber(fiber.id, fiber.name, newLayer);
          newLayer.children.push(newFiber);
        });
        newScaffold.children.push(newLayer);
      });
      this.print.children.push(newScaffold);
    });
  }

  private recalculateSelectedMEWData() {
    this.selectedScaffoldsTotal = this.shownScaffolds.filter(scaffold => scaffold.isSelected).length;
    this.selectedLayersTotal = this.shownLayers.filter(layer => layer.isSelected).length;
    this.selectedFibersTotal = this.shownFibers.filter(fiber => fiber.isSelected).length;
  }

  private removeElementFromArray(array: MEWData[], element: MEWData): void {
    let index: number = array.findIndex(value => element.id == value.id);
    if (index != -1) array.splice(index, 1);
  }
}
