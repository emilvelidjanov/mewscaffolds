import { Component, OnInit } from '@angular/core';
import { PrintService } from './service/print-service/print.service';
import { Layer } from './model/layer/layer';
import { Scaffold } from './model/scaffold/scaffold';
import { Fiber } from './model/fiber/fiber';
import { Print } from './model/print/print';
import { TokenListData } from './model/abstract/token-list-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title: string;

  print: Print;
  layersOfSelectedScaffolds: Layer[];
  fibersOfSelectedLayers: Fiber[];
  
  constructor(private printService: PrintService) { }

  ngOnInit(): void {
    this.title = "MEW Scaffolds";
    this.printService.getById(1).subscribe(print => {
      this.print = print;
      this.deselectAllChildren(this.print);
    });
    this.layersOfSelectedScaffolds = [];
  }

  // TODO: fix bug where if you select children, then deselect the parent of the parent the children don't deselect
  onScaffoldSelected(scaffolds: Scaffold[]): void {
    this.layersOfSelectedScaffolds = [];
    scaffolds.forEach(scaffold => {
      if (scaffold.isSelected) {
        this.layersOfSelectedScaffolds.push.apply(this.layersOfSelectedScaffolds, scaffold.children);
      }
      else {
        this.deselectAllChildren(scaffold);
      }
    });
  }

  onLayerSelected(layers: Layer[]): void {
    this.fibersOfSelectedLayers = [];
    layers.forEach(layer => {
      if (layer.isSelected) {
        this.fibersOfSelectedLayers.push.apply(this.fibersOfSelectedLayers, layer.children);
      }
      else {
        this.deselectAllChildren(layer);
      }
    });
  }

  onFiberSelected(fibers: Fiber[]): void {
    console.log(fibers);
  }

  onScaffoldChanged(scaffolds: Scaffold[]): void {
    console.log(scaffolds);
  }

  onLayerChanged(layers: Layer[]): void {
    console.log(layers);
  }

  onFiberChanged(fibers: Fiber[]): void {
    console.log(fibers);
  }

  onScaffoldAdded(scaffolds: Scaffold[]): void {
    console.log(scaffolds);    
  }

  onLayerAdded(layers: Layer[]): void {
    console.log(layers);    
  }

  onFiberAdded(fibers: Fiber[]): void {
    console.log(fibers);
  }
  
  private deselectAllChildren(tokenListData: TokenListData): void {
    if (tokenListData.children != undefined) {
      tokenListData.children.forEach(child => {
        this.deselectAllChildren(child);
        tokenListData.isSelected = false;
      });
    }
    else {
      tokenListData.children = null;
      tokenListData.isSelected = false;
    }
  }

  // private getLowestUnusedId(): number {
  //   let newId: number = 0;
  //   let sortedData: TokenListData[] = this.data.slice();
  //   sortedData.sort((a, b) => (a.id > b.id) ? 1 : -1)
  //   for (newId; newId < sortedData.length; newId++) {
  //     const usedId = sortedData[newId].id;
  //     if (newId != usedId) break;
  //   }
  //   return newId;
  // }
}
