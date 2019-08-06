import { Component, Input } from '@angular/core';
import { Token } from 'src/app/model/token/token';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent {

  @Input('listTitle')
  title: string;
  tokens: Token[];

  private selectedTotal: number;

  constructor() {
    this.title = undefined;
    this.tokens = [];
    this.selectedTotal = 0;
  }

  onTokenMouseUp(token: Token, event: MouseEvent): void {
    let clickedElement = event.currentTarget as HTMLDivElement;
    clickedElement.classList.toggle('active');
    token.isSelected = clickedElement.classList.contains('active');
    token.isSelected ? this.selectedTotal++ : this.selectedTotal--;
  }

  onTokenDropped(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  addNewToken(): void {
    let newId: number = 0;
    let sortedTokens: Token[] = this.tokens.slice();
    sortedTokens.sort((a, b) => (a.id > b.id) ? 1 : -1)
    for (newId; newId < sortedTokens.length; newId++) {
      const usedId = sortedTokens[newId].id;
      if (newId != usedId) break;
    }
    this.tokens.push(new Token(newId, "New " + newId));
  }

  removeTokens(): void {
    this.tokens = this.tokens.filter(token => {
      return !token.isSelected;
    });
    this.selectedTotal = 0;
  }

}
