import { Component, Input, OnInit } from '@angular/core';
import { MewData } from 'src/app/model/abstract/mew-data';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { MewDataService } from 'src/app/service/mewdata/mewdata.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// TODO: token colors
// TODO: symbols instead of text
@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {

  @Input() data: MewData[];
  @Input() label: string;
  @Input() tokenLabel: string;

  // TODO: force collapse/uncollapse?
  isCollapsed: boolean;
  collapseButtonText: string;

  selectedTotal: number;

  constructor(private mewDataService: MewDataService, private textConfig: TextConfig) {
    this.data = [];
    this.label = "";
    this.tokenLabel = "";
    this.isCollapsed = false;
    this.collapseButtonText = "";
    this.selectedTotal = 0;
  }

  // TODO: button tooltips
  ngOnInit() {
    this.checkCollapseButtonText();
  }

  ngDoCheck() {
    this.selectedTotal = this.data.filter(token => token.isSelected).length;
  }

  onTokenMouseUp(token: MewData): void {
    token.isSelected = !token.isSelected;
    if (!token.isSelected) this.mewDataService.setMewDataIsSelectedRecursive(token, false);
    this.mewDataService.pushNextPrint(this.mewDataService.print);
  }

  // TODO: cleanup
  // TODO: adjust "drop here..." text based on where it was dragged
  // TODO: drag to other box to switch parent?
  onTokenDropped(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container && event.previousIndex !== event.currentIndex) {
      let viewData: MewData[] = this.getViewData().reverse();
      moveItemInArray(viewData, event.previousIndex, event.currentIndex);
      let movedChild: MewData = viewData[event.currentIndex];
      let below: MewData = viewData[event.currentIndex + 1] || null;
      let above: MewData = viewData[event.currentIndex - 1] || null;
      if (below && !above) {
        this.mewDataService.addChildToParent(movedChild, below.parent);
      }
      else if (above && !below) {
        this.mewDataService.attachChildToParent(movedChild, above.parent, 0);
      }
      else if (below.parent === above.parent) {
        this.mewDataService.spliceChildToNeighbor(movedChild, above);
      }
      else if (below.parent !== above.parent) {
        if (below.parent === movedChild.parent) {
          this.mewDataService.addChildToParent(movedChild, below.parent);
        }
        else if (above.parent === movedChild.parent) {
          this.mewDataService.attachChildToParent(movedChild, above.parent, 0);
        }
        else {
          this.mewDataService.addChildToParent(movedChild, below.parent);
        }
      }
      movedChild.path = this.mewDataService.createPathOfMewData(movedChild);
      this.mewDataService.pushNextPrint(this.mewDataService.print);
    }
  }

  // TODO: fix add on empty list
  addNew(): void {
    new Set(this.getViewData().map(token => token.parent)).forEach(parent => {
      this.mewDataService.addNewChildToParent(parent);
    });
    this.mewDataService.pushNextPrint(this.mewDataService.print);
  }

  // TODO: cleanup
  cloneSelected(): void {
    this.getViewData().filter(token => token.isSelected).forEach(token => {
      token.parent.children.push(this.mewDataService.deepCopy(token, token.parent));
    });
    this.mewDataService.pushNextPrint(this.mewDataService.print);
  }

  deleteSelected(): void {
    this.getViewData().filter(token => token.isSelected).forEach(token => {
      this.mewDataService.detachChildFromParent(token);
    });
    this.mewDataService.pushNextPrint(this.mewDataService.print);
  }

  selectAll(): void {
    this.getViewData().forEach(token => {
      token.isSelected = true;
    });
  }

  selectNone(): void {
    this.getViewData().forEach(token => {
      token.isSelected = false;
      this.mewDataService.setMewDataIsSelectedRecursive(token, false);
    });
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.checkCollapseButtonText();
  }

  getViewData(): MewData[] {
    return this.data.filter(token => token.parent.isSelected);
  }

  private checkCollapseButtonText(): void {
    this.collapseButtonText = (this.isCollapsed ? this.textConfig.collapseButtonTextOpen : this.textConfig.collapseButtonTextClose);
  }
}
