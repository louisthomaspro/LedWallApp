import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  uri = environment.apiUrl + '/controller';

  constructor(private http: HttpClient) { }


  up(): Observable<any> {
    return this.http.get<any>(`${this.uri}/up`);
  }

  down(): Observable<any> {
    return this.http.get<any>(`${this.uri}/down`);
  }

  right(): Observable<any> {
    return this.http.get<any>(`${this.uri}/right`);
  }

  left(): Observable<any> {
    return this.http.get<any>(`${this.uri}/left`);
  }
}
