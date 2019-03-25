import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Wordart} from '../models/wordart.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordartService {

  uri = environment.apiUrl + '/wordarts';

  constructor(private http: HttpClient) { }


  get(): Observable<any> {
    return this.http.get<any>(`${this.uri}/`);
  }

  getById(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/` + id);
  }

  create(data: Wordart): Observable<any> {
    return this.http.post<any>(`${this.uri}/`, data);
  }

  update(id: string, data: Wordart): Observable<any> {
    return this.http.post<any>(`${this.uri}/` + id, data);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.uri}/` + id);
  }

  run(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/run/` + id);
  }

}
