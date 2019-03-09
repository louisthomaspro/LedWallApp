import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LwFilesService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:8080/files';

  getFiles(): Observable<any> {
    return this.http.get<any>(`${this.uri}/`);
  }



  deleteFiles(id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: id
      }
    };
    return this.http.delete<any>(`${this.uri}/`, options);
  }



  uploadFiles(file): Observable<boolean> {

    console.log(file);
    const params = new HttpParams();

    const formData = new FormData();
    formData.append('fileInput', file)

    const options = {
      headers: new HttpHeaders(),
      params: params,
      reportProgress: true,
      withCredentials: true,
    };

    return this.http.post<any>(`${this.uri}/`, formData, options);
  }

}
