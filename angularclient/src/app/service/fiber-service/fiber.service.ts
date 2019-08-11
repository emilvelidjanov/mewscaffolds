import { Injectable } from '@angular/core';
import { Fiber } from 'src/app/model/fiber/fiber';
import { Observable, of } from 'rxjs';
import { TokenListDataService } from 'src/app/interface/token-list-data-service/token-list-data-service';

@Injectable({
  providedIn: 'root'
})
export class FiberService implements TokenListDataService {

  data: Fiber[] = [];

  add(item: Fiber) {
    this.data.push(item);
  }

  update(item: Fiber) {
    this.data.filter(value => {
      value.id == item.id;
    })[0] = item;
  }

  delete(item: Fiber) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getAll(): Observable<Fiber[]> {
    return of(this.data);
  }

  getById(id: number): Observable<Fiber> {
    return of(this.data.filter(value => {
      value.id = id;
    })[0]);
  }
}
