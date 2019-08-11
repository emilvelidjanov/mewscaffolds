import { Component, Input, OnInit, Injector } from '@angular/core';
import { Token } from 'src/app/model/token/token';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TokenListData } from 'src/app/interface/token-list-data/token-list-data';

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
  
  tokens: Token[];
  selectedTotal: number;
  cdkDragPlaceholderText: string;
  addButtonText: string;
  selectAllButtonText: string;
  selectNoneButtonText: string;
  removeButtonText: string;
  
  constructor() { }
  
  ngOnInit(): void {
    this.tokens = [];
    this.selectedTotal = 0;
    this.cdkDragPlaceholderText = "Drop here...";
    this.addButtonText = "Add";
    this.selectAllButtonText = "Select all";
    this.selectNoneButtonText = "Select none";
    this.removeButtonText = "Remove";
  }

  ngOnChanges() {
    this.tokens = [];
    if (this.data != undefined) {
      this.data.forEach(item => {
        this.tokens.push(new Token(item.id, item.name));
      });
    }
  }

  onTokenMouseUp(token: Token): void {
    token.isSelected = !token.isSelected;
    token.isSelected ? this.selectedTotal++ : this.selectedTotal--;
  }

  onTokenDropped(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tokens.reverse(), event.previousIndex, event.currentIndex);
    }
    this.tokens.reverse();
  }

  addNew(): void {
    let newId = this.getLowestUnusedId();
    this.tokens.push(new Token(newId, this.tokenLabel + " " + newId));
  }

  removeSelected(): void {
    this.tokens = this.tokens.filter(token => {
      return !token.isSelected;
    });
    this.selectedTotal = 0;
  }

  selectAll(): void {
    this.tokens.forEach(token => {
      token.isSelected = true;
    });
    this.selectedTotal = this.tokens.length;
  }

  selectNone(): void {
    this.tokens.forEach(token => {
      token.isSelected = false;
    });
    this.selectedTotal = 0;
  }

  private getLowestUnusedId(): number {
    let newId: number = 0;
    let sortedData: TokenListData[] = this.tokens.slice();
    sortedData.sort((a, b) => (a.id > b.id) ? 1 : -1)
    for (newId; newId < sortedData.length; newId++) {
      const usedId = sortedData[newId].id;
      if (newId != usedId) break;
    }
    return newId;
  }
}
