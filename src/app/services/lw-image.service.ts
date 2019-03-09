import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LwImageService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:8080/users';
  private currentUser = new Subject<String>();

  registerUser(fileToUpload: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post<any>(`${this.uri}/register`, formData);
  }

}
