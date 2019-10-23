import { Component, Input, OnInit } from '@angular/core';
import { MewData } from 'src/app/model/abstract/mew-data';
import { TextConfig } from 'src/app/config/text-config/text-config';
import { MewDataService } from 'src/app/service/mew-data/mew-data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SettingsConfig } from 'src/app/config/settings-config/settings-config';

// TODO: token colors
// TODO: symbols instead of text
// TODO: style when multi select off
@Component({
  selector: 'app-mew-data-list',
  templateUrl: './mew-data-list.component.html',
  styleUrls: ['./mew-data-list.component.scss']
})
export class MewDataListComponent implements OnInit {

  @Input() data: MewData[];
  @Input() parentData: MewData[];
  @Input() label: string;
  @Input() tokenLabel: string;

  // TODO: auto-collapse and force collapse/uncollapse?
  isCollapsed: boolean;
  collapseButtonIcon: string;
  collapseButtonTitle: string;

  isAddDisabled: boolean;

  selectedTotal: number;

  constructor(private mewDataService: MewDataService, private textConfig: TextConfig, private settingsConfig: SettingsConfig) {
    this.data = [];
    this.parentData = [];
    this.label = "";
    this.tokenLabel = "";
    this.isCollapsed = false;
    this.collapseButtonIcon = "";
    this.collapseButtonTitle = "";
    this.selectedTotal = 0;
  }

  // TODO: button tooltips
  ngOnInit() {
    this.checkCollapseButtonIcon();
  }

  ngOnChanges() {
    this.isAddDisabled = this.parentData.filter(parent => parent.isSelected).length == 0;
    this.selectedTotal = this.data.filter(item => item.isSelected).length;
  }

  onTokenMouseUp(token: MewData): void {
    if (!this.settingsConfig.multiSelectOn && !token.isSelected) {
      this.getViewData().filter(token => token.isSelected).forEach(token => {
        this.mewDataService.setMewDataIsSelectedRecursive(token, false);
      });
    }
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

  addNew(): void {
    this.parentData.filter(parent => parent.isSelected).forEach(parent => {
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
    if (this.settingsConfig.multiSelectOn) {
      this.getViewData().forEach(token => {
        token.isSelected = true;
      });
      this.mewDataService.pushNextPrint(this.mewDataService.print);
    }
  }

  selectNone(): void {
    if (this.settingsConfig.multiSelectOn) {
      this.getViewData().forEach(token => {
        token.isSelected = false;
        this.mewDataService.setMewDataIsSelectedRecursive(token, false);
      });
      this.mewDataService.pushNextPrint(this.mewDataService.print);
    }
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.checkCollapseButtonIcon();
  }

  getViewData(): MewData[] {
    return this.data.filter(token => token.parent.isSelected);
  }

  private checkCollapseButtonIcon(): void {
    this.collapseButtonIcon = (this.isCollapsed ? "oi oi-chevron-bottom" : "oi oi-chevron-top");
    this.collapseButtonTitle = (this.isCollapsed ? this.textConfig.collapseButtonTextOpen : this.textConfig.collapseButtonTextClose);
  }
}
