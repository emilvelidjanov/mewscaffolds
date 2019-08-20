import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MEWData } from 'src/app/model/abstract/mew-data';
import { TextConfig } from 'src/app/config/text-config/text-config';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {
  
  @Input('data')
  data: MEWData[];
  @Input('label')
  label: string;
  @Input('tokenLabel')
  tokenLabel: string;
  @Input('selectedTotal')
  selectedTotal: number;
  @Input('isCollapsed')
  isCollapsed: boolean;

  @Output()
  tokenListDataSelect = new EventEmitter<MEWData[]>();
  @Output()
  tokenListDataChange = new EventEmitter<MEWData[]>();
  @Output()
  tokenListDataAdd = new EventEmitter();
  
  collapseButtonText: string;

  constructor(private textConfig: TextConfig) { }
  
  // TODO: button tooltips
  ngOnInit(): void {
    this.data = [];
    this.checkCollapseButtonText();
  }

  ngOnChanges() {
    this.checkCollapseButtonText();
  }

  onTokenMouseUp(token: MEWData): void {
    token.isSelected = !token.isSelected;
    this.tokenListDataSelect.emit(this.data);
  }

  // TODO: think about drag drop -> swap data or move data?
  onTokenDropped(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.data.reverse(), event.previousIndex, event.currentIndex);
      let firstChild: MEWData = this.data[event.currentIndex];
      let secondChild: MEWData = this.data[event.previousIndex];
      let parent: MEWData = firstChild.parent;
      let path: string = firstChild.path;
      firstChild.parent = secondChild.parent;
      secondChild.parent = parent;
      firstChild.path = secondChild.path;
      secondChild.path = path;
      this.data.reverse();
      this.tokenListDataChange.emit(this.data);
    }
  }

  // TODO: implement
  addNew(): void {
    this.tokenListDataAdd.emit(this.data);
  }

  deleteSelected(): void {
    this.data.filter(token => token.isSelected).forEach(item => {
      item.markedForDeletion = true;
    });
    this.tokenListDataChange.emit(this.data);
  }

  selectAll(): void {
    this.data.forEach(token => {
      token.isSelected = true;
    });
    this.tokenListDataSelect.emit(this.data);
  }

  selectNone(): void {
    this.data.forEach(token => {
      token.isSelected = false;
    });
    this.tokenListDataSelect.emit(this.data);
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.checkCollapseButtonText();
  }

  private checkCollapseButtonText() {
    this.collapseButtonText = (this.isCollapsed ? this.textConfig.collapseButtonTextOpen : this.textConfig.collapseButtonTextClose);
  }

  private getLowestUnusedId(): number {
    let newId: number = 0;
    let sortedData: MEWData[] = this.data.slice();
    sortedData.sort((a, b) => (a.id > b.id) ? 1 : -1)
    for (newId; newId < sortedData.length; newId++) {
      const usedId = sortedData[newId].id;
      if (newId != usedId) break;
    }
    return newId;
  }
}
