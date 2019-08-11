import { Injectable } from '@angular/core';
import { Layer } from 'src/app/model/layer/layer';
import { Observable, of } from 'rxjs';
import { TokenListDataService } from 'src/app/interface/token-list-data-service/token-list-data-service';

@Injectable({
  providedIn: 'root'
})
export class LayerService implements TokenListDataService {

  data: Layer[] = [];

  add(item: Layer) {
    this.data.push(item);
  }

  update(item: Layer) {
    this.data.filter(value => {
      value.id == item.id;
    })[0] = item;
  }

  delete(item: Layer) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getAll(): Observable<Layer[]> {
    return of(this.data);
  }

  getById(id: number): Observable<Layer> {
    return of(this.data.filter(value => {
      value.id = id;
    })[0]);
  }
}
