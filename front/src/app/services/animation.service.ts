import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Animation} from '../modals/animation';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  uri = 'http://localhost:8080/animations';

  constructor(private http: HttpClient) { }


  get(): Observable<Animation[]> {
    return this.http.get<Animation[]>(`${this.uri}/`);
  }

  getById(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/` + id);
  }

  create(data: Animation): Observable<string> {
    console.log('running http post');
    return this.http.post<string>(`${this.uri}/`, data);
  }

  update(id: string, data: Animation): Observable<Animation> {
    return this.http.post<Animation>(`${this.uri}/` + id, data);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.uri}/` + id);
  }

  run(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/run/` + id);
  }
}
