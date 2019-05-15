import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  uri = environment.apiUrl + '/scripts';

  constructor(private http: HttpClient) { }


  get(): Observable<any> {
    return this.http.get<any>(`${this.uri}/`);
  }

  getById(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/` + id);
  }

  upload(file): Observable<boolean> {

    const params = new HttpParams();

    const formData = new FormData();
    formData.append('fileInput', file);

    return this.http.post<any>(`${this.uri}/`, formData);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.uri}/` + id);
  }

  run(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/run/` + id);
  }

}
