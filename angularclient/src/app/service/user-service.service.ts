import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public readonly baseUrl: string = "http://localhost:8080/user";
  public readonly allEndpoint: string = "/all";
  public readonly addEndpoint: string = "/add";

  public constructor(private httpClient: HttpClient) { }

  public getById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + "/" + id);
  }

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + this.allEndpoint);
  }

  public add(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + this.addEndpoint, user, {
      headers: {'Content-Type' : 'application/json'}
    });
  }

  public delete(id: number) {
    this.httpClient.delete<void>(this.baseUrl + "/" + id);
  }
}
