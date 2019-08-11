import { Injectable } from '@angular/core';
import { Print } from 'src/app/model/print/print';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scaffold } from 'src/app/model/scaffold/scaffold';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  readonly baseUrl: string = "http://localhost:8080/print/";
  readonly allEndpoint: string = "all";
  readonly saveEndpoint: string = "save";
  readonly deleteEndpoint: string = "delete";

  constructor(private httpClient: HttpClient) { }

  getById(id: number): Observable<Print> {
    return this.httpClient.get<Print>(this.baseUrl + id);
  }

  savePrint(print: Print): Observable<Print> {
    return this.httpClient.post<Print>(this.baseUrl + this.saveEndpoint, print);
  }
}
