import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TokenListData } from 'src/app/model/abstract/token-list-data';
import { $ } from 'protractor';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {
  
  @Input('data')
  data: TokenListData[];
  @Input('label')
  label: string;
  @Input('tokenLabel')
  tokenLabel: string;

  @Output()
  tokenListDataSelect = new EventEmitter<TokenListData[]>();
  @Output()
  tokenListDataChange = new EventEmitter<TokenListData[]>();
  @Output()
  tokenListDataAdd = new EventEmitter();
  
  selectedTotal: number;
  cdkDragPlaceholderText: string;
  addButtonText: string;
  selectAllButtonText: string;
  selectNoneButtonText: string;
  removeButtonText: string;
  collapseButtonText: string;
  readonly collapseButtonTextClose = "Close";
  readonly collapseButtonTextOpen = "Open";

  isCollapsed: boolean;
  
  constructor() { }
  
  ngOnInit(): void {
    this.data = [];
    this.selectedTotal = 0;
    this.cdkDragPlaceholderText = "Drop here...";
    this.addButtonText = "Add";
    this.selectAllButtonText = "Select all";
    this.selectNoneButtonText = "Select none";
    this.removeButtonText = "Remove";
    this.collapseButtonText = this.collapseButtonTextOpen;
    this.isCollapsed = true;
  }

  onTokenMouseUp(token: TokenListData): void {
    token.isSelected = !token.isSelected;
    token.isSelected ? this.selectedTotal++ : this.selectedTotal--;
    this.tokenListDataSelect.emit(this.data);
  }

  // TODO: fix drag and dropping between parents
  onTokenDropped(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.data.reverse(), event.previousIndex, event.currentIndex);
    }
    this.data.reverse();
    this.tokenListDataChange.emit(this.data);
  }

  addNew(): void {
    this.tokenListDataAdd.emit(this.data);
  }

  deleteSelected(): void {
    // this.tokens = this.tokens.filter(token => {
    //   return !token.isSelected;
    // });
    // this.selectedTotal = 0;
  }

  selectAll(): void {
    this.data.forEach(token => {
      token.isSelected = true;
    });
    this.selectedTotal = this.data.filter(token => token.isSelected).length;
    this.tokenListDataSelect.emit(this.data);
  }

  selectNone(): void {
    this.data.forEach(token => {
      token.isSelected = false;
    });
    this.selectedTotal = this.data.filter(token => token.isSelected).length;
    this.tokenListDataSelect.emit(this.data);
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseButtonText = (this.isCollapsed ? this.collapseButtonTextOpen : this.collapseButtonTextClose);
  }

  private getLowestUnusedId(): number {
    let newId: number = 0;
    let sortedData: TokenListData[] = this.data.slice();
    sortedData.sort((a, b) => (a.id > b.id) ? 1 : -1)
    for (newId; newId < sortedData.length; newId++) {
      const usedId = sortedData[newId].id;
      if (newId != usedId) break;
    }
    return newId;
  }
}
