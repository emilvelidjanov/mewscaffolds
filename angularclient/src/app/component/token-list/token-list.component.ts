import { Component, Input } from '@angular/core';
import { Token } from 'src/app/model/token/token';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent {
  
  tokens: Token[];
  selectedTotal: number;

  @Input('label')
  label: string;
  @Input('tokenLabel')
  tokenLabel: string;

  cdkDragPlaceholderText: string;
  addButtonText: string;
  selectAllButtonText: string;
  selectNoneButtonText: string;
  removeButtonText: string;

  constructor() {
    this.tokens = [];
    this.selectedTotal = 0;
    this.label = undefined;
    this.tokenLabel = undefined;
    this.cdkDragPlaceholderText = "Drop here...";
    this.addButtonText = "Add";
    this.selectAllButtonText = "Select all";
    this.selectNoneButtonText = "Select none";
    this.removeButtonText = "Remove";
  }

  onTokenMouseUp(token: Token, event: MouseEvent): void {
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
    let sortedTokens: Token[] = this.tokens.slice();
    sortedTokens.sort((a, b) => (a.id > b.id) ? 1 : -1)
    for (newId; newId < sortedTokens.length; newId++) {
      const usedId = sortedTokens[newId].id;
      if (newId != usedId) break;
    }
    return newId;
  }
}
