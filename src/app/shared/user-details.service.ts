import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {UserDetailsModel} from "./user-details.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'https://localhost:44383/api/UserDetails/';

  public create(Model) {
    return this.http.post(this.baseURL, Model).pipe(map(res => {
      return res;
    }));
  }

  public get() {
    return this.http.get(this.baseURL).pipe(map(res => {
      return res;
    }));
  }

  public delete(id) {
    return this.http.delete(this.baseURL + id).pipe(map(res => {
      return res;
    }));
  }

  public getById(id): Observable<UserDetailsModel> {
    return this.http.get(this.baseURL + id).pipe(map((res: UserDetailsModel) => {
      return res;
    }));
  }
  public update(Model) {
    return this.http.put(this.baseURL, Model).pipe(map(res => {
      return res;
    }));
  }
}
