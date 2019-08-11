import { Injectable } from '@angular/core';
import { Scaffold } from 'src/app/model/scaffold/scaffold';
import { Observable, of } from 'rxjs';
import { TokenListDataService } from 'src/app/interface/token-list-data-service/token-list-data-service';

@Injectable({
  providedIn: 'root'
})
export class ScaffoldService implements TokenListDataService {

  data: Scaffold[] = [];

  add(item: Scaffold) {
    this.data.push(item);
  }

  update(item: Scaffold) {
    this.data.filter(value => {
      value.id == item.id;
    })[0] = item;
  }

  delete(item: Scaffold) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getAll(): Observable<Scaffold[]> {
    return of(this.data);
  }

  getById(id: number): Observable<Scaffold> {
    return of(this.data.filter(value => {
      value.id = id;
    })[0]);
  }
}
