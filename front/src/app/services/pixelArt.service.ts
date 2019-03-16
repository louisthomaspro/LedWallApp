import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PixelArt} from '../modals/pixelArt';
import {Animation} from "../modals/animation";

@Injectable({
  providedIn: 'root'
})
export class PixelArtService {

  uri = 'http://localhost:8080/pixelarts';

  constructor(private http: HttpClient) { }


  get(): Observable<PixelArt[]> {
    return this.http.get<PixelArt[]>(`${this.uri}/`);
  }

  getById(id): Observable<PixelArt> {
    return this.http.get<PixelArt>(`${this.uri}/` + id);
  }

  post(data: PixelArt): Observable<PixelArt> {
    return this.http.post<PixelArt>(`${this.uri}/`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.uri}/` + id);
  }

  run(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/run/` + id);
  }




  // uploadFiles(file): Observable<boolean> {
  //
  //   console.log(file);
  //   const params = new HttpParams();
  //
  //   const formData = new FormData();
  //   formData.append('fileInput', file)
  //
  //   const options = {
  //     headers: new HttpHeaders(),
  //     params: params,
  //     reportProgress: true,
  //     withCredentials: true,
  //   };
  //
  //   return this.http.post<any>(`${this.uri}/`, formData, options);
  // }

}
