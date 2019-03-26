import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pixelart} from '../models/pixelart.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PixelartService {

  uri = environment.apiUrl + '/pixelarts';

  constructor(private http: HttpClient) { }


  get(): Observable<any> {
    return this.http.get<any>(`${this.uri}/`);
  }

  getById(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/` + id);
  }

  create(data: Pixelart): Observable<any> {
    return this.http.post<any>(`${this.uri}/`, data);
  }

  update(id: string, data: Pixelart): Observable<any> {
    return this.http.post<any>(`${this.uri}/` + id, data);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.uri}/` + id);
  }

  run(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/run/` + id);
  }

}
